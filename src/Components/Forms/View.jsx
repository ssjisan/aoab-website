import { Stack, Typography, Button, TextField, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function View() {
  const [onlineLearning, setOnlineLearning] = useState([]); // Stores the videos
  const [hasMore, setHasMore] = useState(true); // Tracks if more data is available
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [searchQuery, setSearchQuery] = useState(""); // Tracks the search query
  const [currentSearch, setCurrentSearch] = useState(""); // Holds the active search query
  const limit = 5; // Number of videos per page
  const [skip, setSkip] = useState(0); // Number of videos to skip for pagination
  const [dataLoaded, setDataLoaded] = useState(false); // Tracks if initial data has been loaded

  // Load initial data on component mount
  useEffect(() => {
    loadOnlineLearning(true); // Initial load
  }, []);

  const loadOnlineLearning = async (initial = false, query = currentSearch) => {
    if (loading) return; // Prevent multiple concurrent requests
    if (!hasMore && !initial) return; // Stop if no more videos

    try {
      setLoading(true); // Set loading state to true

      // Calculate skip for the current load
      const currentSkip = initial ? 0 : skip;

      // Fetch data from the server
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/search-forms`,
        {
          params: {
            searchQuery: query, // Use the provided query
            limit,
            skip: currentSkip,
          },
        }
      );

      // Handle response data
      if (initial) {
        setOnlineLearning(data.forms); // Reset data for initial load
      } else {
        setOnlineLearning((prev) => [...prev, ...data.forms]); // Append new data
      }

      // Update skip for the next fetch
      setSkip(currentSkip + limit);

      // Update hasMore flag
      setHasMore(data.hasMore);
      setDataLoaded(true); // Mark data as loaded
    } catch (err) {
      toast.error("Error loading videos"); // Show error toast
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSearch = () => {
    setSkip(0); // Reset skip
    setHasMore(true); // Reset hasMore
    setCurrentSearch(searchQuery); // Set current search query
    loadOnlineLearning(true, searchQuery); // Pass the search query directly
  };
  const highlightText = (text) => {
    if (!searchQuery) return text; // If no search term, return text as is
    const regex = new RegExp(`(${searchQuery})`, "gi"); // Case-insensitive search
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  
  return (
    <Stack gap="24px" alignItems="center">
      {/* Show search bar only after data has been loaded */}
      {dataLoaded && (
        <Stack
          gap="16px"
          flexDirection="row"
          sx={{ width: "100%" }}
          alignItems="center"
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            placeholder="Search by name"
            sx={{ width: "100%" }}
            size="medium"
          />
          <Button variant="contained" size="large" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
      )}

      {/* Journals list */}
      <Stack gap={"24px"} sx={{ width: "100%" }}>
        {!dataLoaded
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={120}
                sx={{ borderRadius: "12px" }}
              />
            ))
          : onlineLearning.length === 0 ? (
            // Display message if no results found
            <Typography variant="h6" color="text.secondary">
              No results found for &quot;{searchQuery}&quot;
            </Typography>
          ) : (
            onlineLearning.map((row, i) => (
              <Stack
                sx={{
                  p: "8px 16px",
                  backgroundColor: "#EFF1F5",
                  borderRadius: "12px",
                }}
                gap="16px"
                flexDirection="row"
                alignItems="center"
                key={i}
              >
                <Typography
                  sx={{
                    fontSize: "64px !important",
                    fontWeight: 700,
                    opacity: 0.15,
                  }}
                >
                  {i + 1}
                </Typography>
                <Stack sx={{ width: "100%", pl: "16px" }}>
                  <Typography variant="h4" color="text.primary">
                    {highlightText(row.title)} {/* Highlight the title */}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {new Date(row.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Stack>
                <Button
                  variant="soft"
                  sx={{ width: "180px" }}
                  component="a" // This makes the Button behave as a link
                  href={row.link} // Link from the database
                  target="_blank" // Open the link in a new tab
                  rel="noopener noreferrer" // Security feature when opening external links
                >
                  Read More
                </Button>
              </Stack>
            ))
          )}
      </Stack>

      {/* Load More button */}
      {hasMore && dataLoaded && (
        <Button
          onClick={() => loadOnlineLearning(false)}
          variant="contained"
          sx={{ width: "120px" }}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </Stack>
  );
}
