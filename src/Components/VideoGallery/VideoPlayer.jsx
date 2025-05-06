import { Box, IconButton, Modal, Stack, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { Cross } from "../../assets/Icons";

export default function VideoPlayer({
  open,
  handleCloseVideoPlayer,
  selectedVideo,
}) {
  const forBelow767 = useMediaQuery("(max-width:767px)");

  const convertToEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("drive.google.com/file/d/")) {
      const videoId = url.split("/d/")[1].split("/")[0];
      return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    return "";
  };

  const embedUrl = selectedVideo ? convertToEmbedUrl(selectedVideo) : "";

  return (
    <Modal
      open={open}
      onClose={handleCloseVideoPlayer}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdrop: {
          backgroundColor: "rgba(0, 32, 51, 0.64)",
        },
      }}
    >
      <Box
        sx={{
          width: forBelow767 ? "90%" : "70%",
          maxWidth: "900px",
          aspectRatio: "3 / 2",
          bgcolor: "transparent",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        >
          <IconButton
            onClick={handleCloseVideoPlayer}
            sx={{
              width: "32px",
              height: "32px",
              bgcolor: "red",
              "&:hover": {
                bgcolor: "red",
              },
            }}
          >
            <Cross size={20} color="white" />
          </IconButton>
        </Stack>

        {/* Video Container */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <iframe
            src={embedUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Preview"
          />
        </Box>
      </Box>
    </Modal>
  );
}

VideoPlayer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseVideoPlayer: PropTypes.func.isRequired,
  selectedVideo: PropTypes.string.isRequired,
};
