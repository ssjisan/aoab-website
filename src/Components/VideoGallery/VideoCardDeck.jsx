import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoData from "../../assets/NoData";

export default function VideoCardDeck() {
  const [allVideos, setAllVideos] = useState([]);
  const [skip, setSkip] = useState(0); // Track how many videos to skip
  const [hasMore, setHasMore] = useState(true); // Whether there are more videos to load
  const [loading, setLoading] = useState(false); // Track loading state
  const limit = 5; // Number of videos to load per request
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    // Fetch profile data when component mounts
    const loadProfileData = async () => {
      try {
        const { data } = await axios.get("/my-profile-data");
        setProfile(data); // Set the profile data
      } catch (err) {
        toast.error("Error loading profile", err.message);
      }
    };

    loadProfileData(); // Call the function to load profile data

    if (profile?.isAccountVerified) {
      loadVideos(true); // Load videos if account is verified
    }
  }, []);

  useEffect(() => {
    loadVideos(true); // Initial load
  }, []);

  const loadVideos = async (initial = false) => {
    if (loading) return; // Prevent multiple requests
    if (!hasMore && !initial) return; // Stop if no more videos

    try {
      setLoading(true);

      // Calculate the correct skip value
      const currentSkip = initial ? 0 : skip;

      // Call the server with limit and skip as query parameters
      const { data } = await axios.get("/videos", {
        params: { limit, skip: currentSkip },
      });

      if (initial) {
        // If it's the initial load, replace the videos
        setAllVideos(data.videos);
      } else {
        // Otherwise, append the new videos
        setAllVideos((prev) => [...prev, ...data.videos]);
      }

      // Update the skip value for the next batch
      setSkip(currentSkip + limit);

      // Update hasMore based on the server response
      setHasMore(data.hasMore);
    } catch (err) {
      toast.error("Error loading videos");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const getVideoId = (url) => {
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:\S+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null; // Return video ID or null
  };

  return (
    <>
      {!profile?.isAccountVerified === true ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ py: 6, height: "420px" }}
        >
          <NoData />
          <Typography variant="h5" color="text.secondary" textAlign="center">
            Your account is not verified. You cannot access the video resources
            until verification is complete.
          </Typography>
        </Stack>
      ) : (
        <Stack gap="64px" justifyContent="center" alignItems="center">
          <Grid
            container
            rowSpacing={4}
            columnSpacing={4}
            justifyContent="center"
          >
            {allVideos.map((data) => {
              const videoId = getVideoId(data.url); // Get video ID from URL
              const thumb =
                data.videoType === "google-drive"
                  ? data.thumbnail[0]?.url
                  : `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={data._id}>
                  <VideoCard data={data} thumb={thumb} />
                </Grid>
              );
            })}

            {loading &&
              [0, 1, 2].map((index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={220}
                    sx={{ borderRadius: "16px" }} // Match the style of VideoCard
                  />
                  <Skeleton
                    variant="text"
                    sx={{ mt: "16px" }}
                    width="80%" // Adjust width as necessary
                  />
                  <Skeleton variant="text" width="60%" />
                </Grid>
              ))}
          </Grid>

          {hasMore && !loading && (
            <Button
              onClick={() => loadVideos(false)}
              variant="contained"
              sx={{ width: "120px" }}
            >
              Load More
            </Button>
          )}
        </Stack>
      )}
    </>
  );
}
