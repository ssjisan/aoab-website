import ImageGallery from "react-image-gallery";
import { Box, IconButton, Modal, useMediaQuery } from "@mui/material";
import "react-image-gallery/styles/css/image-gallery.css";
import "./GalleryStyle.css"
import { Close } from "../../assets/Icons";
//eslint-disable-next-line
export default function GalleryView({ handleClose, open, galleryImages }) {
  const forBelow767 = useMediaQuery("(max-width:767px)");
  const GalleryStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    p: 4,
    border: "0px solid transparent",
    boxShadow: 0,
    position: "relative", // Required for absolute positioning of close button
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 32, 51, 0.64)",
        },
      }}
    >
      <Box sx={GalleryStyle}>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: forBelow767 && -10,
            right: 40,
            zIndex: "10000000",
            bgcolor: "white", // Remove background
          }}
        >
         <Close/>
        </IconButton>

        <ImageGallery items={galleryImages} />
      </Box>
    </Modal>
  );
}