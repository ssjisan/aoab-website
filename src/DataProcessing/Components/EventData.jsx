import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EventData() {
  const [runningEvents, setRunningEvents] = useState([]); // For storing all running events except the monthly event
  const [monthlyEvents, setMonthlyEvents] = useState([]); // For storing the nearest upcoming event
  const [skip, setSkip] = useState(0); // Track how many events to skip
  const [hasMore, setHasMore] = useState(true); // Whether there are more events to load
  const [loading, setLoading] = useState(false); // Track loading state
  const limit = 5; // Number of events to load per request

  useEffect(() => {
    loadRunningEvents(true); // Initial load
  }, []);

  // Function to load running events, handles pagination logic
  const loadRunningEvents = async (initial = false) => {
    if (loading) return; // Prevent multiple requests
    if (!hasMore && !initial) return; // Stop if no more events

    try {
      setLoading(true);
      const currentSkip = initial ? 0 : skip; // Reset skip for initial load

      // Fetch data from API with query params
      const { data } = await axios.get("/courses_events");

      if (initial) {
        // Reset state on initial load
        const { monthlyEvent, otherEvents } = filterMonthlyEvents(data.coursesEvents);
        setMonthlyEvents(monthlyEvent ? [monthlyEvent] : []);
        setRunningEvents(otherEvents);
        setSkip(limit); // Reset skip for next batch
      } else {
        // Append new events to the list
        setRunningEvents((prev) => [...prev, ...data.coursesEvents]);
        setSkip(currentSkip + limit); // Increment skip for next batch
      }

      setHasMore(data.hasMore); // Update hasMore flag
    } catch (err) {
      toast.error("Error loading running events: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter and separate monthly events from others
  const filterMonthlyEvents = (events) => {
    const currentDate = new Date(); // Get today's date

    // Filter events to get only future events
    const upcomingEvents = events.filter((event) => {
      const eventDate = new Date(event.startDate); // Convert startDate to a Date object
      return eventDate > currentDate; // Check if the event's start date is in the future
    });

    // Sort the events by the nearest start date
    const sortedUpcomingEvents = upcomingEvents.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateA - dateB; // Sort events by ascending date
    });

    // Get the first (nearest) event
    const nextEvent = sortedUpcomingEvents[0]; // Take the nearest event

    // Return the monthly event and the remaining events
    const remainingEvents = events.filter(
      (event) => event._id !== nextEvent?._id
    );
    return { monthlyEvent: nextEvent, otherEvents: remainingEvents };
  };

  return {
    runningEvents,
    monthlyEvents,
    loadRunningEvents,
    hasMore,
    loading,
  };
}
