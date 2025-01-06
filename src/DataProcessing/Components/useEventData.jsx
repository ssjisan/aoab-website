import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useEventData() {
  const [events, setEvents] = useState([]);
  const [lastEvent, setLastEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/all_events`
      );
      const eventData = response.data;
      setEvents(eventData);

      // Find the nearest upcoming event
      const currentDate = new Date();
      const futureEvents = eventData
        .filter((event) => new Date(event.eventDate) >= currentDate)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

      if (futureEvents.length > 0) {
        setLastEvent(futureEvents[0]);
      }
    } catch (error) {
      toast.error("Error loading events. Reload again");
    } finally {
      setLoading(false); // Ensure loading is set to false after data load
    }
  };

  useEffect(() => {
    if (!loading) {
      // Only check for modal conditions when loading is complete
      const lastShown = localStorage.getItem("modalLastShown");
      const now = new Date().getTime();

      // Show modal if 24 hours have passed since the last shown time
      if (!lastShown || now - lastShown > 24 * 60 * 60 * 1000) {
        setIsModalOpen(true);
        localStorage.setItem("modalLastShown", now);
      }
    }
  }, [loading]); // Run this effect when loading state changes

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    events,
    lastEvent, // Include lastEvent in the returned object
    isModalOpen,
    loading, // Include loading state in the returned object
    handleCloseModal,
  };
}
