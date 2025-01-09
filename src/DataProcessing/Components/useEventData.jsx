import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useEventData() {
  const [runningEvents, setRunningEvents] = useState([]); // For storing all running events except monthly event
  const [monthlyEvents, setMonthlyEvents] = useState([]); // For storing the nearest upcoming event
  const [skip, setSkip] = useState(0); // Track how many events to skip
  const [hasMore, setHasMore] = useState(true); // Whether there are more events to load
  const [loading, setLoading] = useState(false); // Track loading state
  const limit = 5; // Number of events to load per request

  useEffect(() => {
    loadRunningEvents(true); // Initial load
  }, []);

  const loadRunningEvents = async (initial = false) => {
    if (loading) return; // Prevent multiple requests
    if (!hasMore && !initial) return; // Stop if no more events

    try {
      setLoading(true);

      const currentSkip = initial ? 0 : skip;

      // Call the API with limit, skip, and status set to "running"
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/courses_events`,
        {
          params: { limit, skip: currentSkip, status: "running" },
        }
      );

      if (initial) {
        // Reset state on initial load
        filterMonthlyEvents(data.coursesEvents); // Identify the monthly event
        setSkip(limit); // Reset skip for the next batch
      } else {
        // Append new events to the list
        setRunningEvents((prev) => [...prev, ...data.coursesEvents]);
        filterMonthlyEvents([...runningEvents, ...data.coursesEvents]); // Identify the monthly event
        setSkip(currentSkip + limit); // Increment skip for next batch
      }

      setHasMore(data.hasMore); // Update hasMore
    } catch (err) {
      toast.error("Error loading running events", err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

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

    setMonthlyEvents(nextEvent ? [nextEvent] : []); // Set only the nearest event

    // Update runningEvents to exclude the monthly event
    const remainingEvents = events.filter(
      (event) => !nextEvent || event._id !== nextEvent._id
    );
    setRunningEvents(remainingEvents);
  };

  return {
    runningEvents,
    monthlyEvents,
    loadRunningEvents,
    hasMore,
    loading,
  };
}
