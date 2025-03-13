import { useContext, useState } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

export default function View() {
  const { runningEvents, loadRunningEvents, hasMore, loading } =
    useContext(DataContext);
  const [loadingMore, setLoadingMore] = useState(false); // Local loading state for the button

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await loadRunningEvents(false); // Load the next batch of events
    setLoadingMore(false);
  };
  const handlePreview = (id) => {
    // Open the URL in a new tab and scroll to the top
    const newTab = window.open(`/course_event/${id}`, "_blank");
    if (newTab) {
      newTab.scrollTo(0, 0); // Ensure the new tab scrolls to the top
    }
  };
  return (
    <Stack gap="48px" alignItems="center">
      <Grid container spacing={3} justifyContent="center">
        {runningEvents.map((data) => {
          const start = new Date(data.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const end = new Date(data.endDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <Grid item xs={12} sm={12} md={4} lg={4} key={data._id}>
              <Stack gap="24px">
                <Box
                  sx={{
                    overflow: "hidden",
                    height: "220px",
                    borderRadius: "12px",
                  }}
                >
                  <img
                    src={data.coverPhoto[0].url}
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Stack gap="12px">
                  <Typography variant="h5" sx={{ height: "80px" }}>
                    {data.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {start} - {end}
                  </Typography>
                </Stack>
                <Button variant="soft" onClick={() => handlePreview(data._id)}>
                  View Details
                </Button>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
      {hasMore && (
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={handleLoadMore}
          disabled={loading || loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </Button>
      )}
    </Stack>
  );
}
