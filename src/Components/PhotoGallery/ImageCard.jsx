import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Play } from "../../assets/Icons";

export default function ImageCard({ data, thumb }) {
  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(timestamp).toLocaleString("en-GB", options);
  };

  const [selectedVideo, setSelectedVideo] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpenVideoPlayer = (data) => {
    setOpen(true);
    setSelectedVideo(data);
  };
  const handleCloseVideoPlayer = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{ width: "100%", cursor: "pointer" }}
        onClick={() => handleOpenVideoPlayer(data?.url)}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            width: "100%",
            height: "220px",
            backgroundImage: `url(${thumb})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "72px",
              height: "52px",
              borderRadius: "12px",
              backgroundColor: "rgba(255, 0, 0, 1)",
              backdropFilter: "blur(4px)",
            }}
          >
            <Play size={40} color="#fff" />
          </Stack>
        </Stack>
        {/* Display the formatted date above the title */}
        <Stack
          sx={{ mt: "24px" }}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack gap="4px">
            <Typography variant="body2" color="text.secondary">
              Posted at: {formatDate(data.createdAt)}
            </Typography>
            <Typography color={"text.primary"}>
              {data.title}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
