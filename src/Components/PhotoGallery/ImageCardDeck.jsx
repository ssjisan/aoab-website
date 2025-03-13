import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { AlbumIcon } from "../../assets/Icons";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import GalleryView from "./GalleryVIew";

export default function ImageCardDeck() {
  const IconBoxSx = {
    width: "24px",
    height: "24px",
  };

  const PointSx = {
    display: "flex",
    gap: "4px",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "110px",
  };

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // State for selected images

  const handleOpen = (images) => {
    if (images && images.length > 0) {
      const formattedImages = images.map((image) => ({
        original: image.src,
        thumbnail: image.src,
      }));
      setSelectedImages(formattedImages); // Set the selected images array in state
      setOpen(true); // Open the modal
    } else {
      toast.error("No images found in this album");
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/albums`
      );
      setAlbums(data);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleImageLoad = (albumId) => {
    setImageLoading((prev) => ({ ...prev, [albumId]: false }));
  };

  const handleImageError = (albumId) => {
    setImageLoading((prev) => ({ ...prev, [albumId]: false }));
  };

  return (
    <Grid container spacing={3}>
      {loading
        ? Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  gap: "24px",
                  flexDirection: "column",
                  p: "24px 12px",
                }}
              >
                <Skeleton variant="rectangular" width="100%" height="260px" />
                <Box
                  sx={{
                    display: "flex",
                    gap: "24px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Skeleton variant="text" width="60%" />
                  <Box sx={PointSx}>
                    <Skeleton variant="circular" width="24px" height="24px" />
                    <Skeleton variant="text" width="60px" />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        : albums.map((data) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={data._id}>
              <Box
                sx={{
                  display: "flex",
                  gap: "24px",
                  flexDirection: "column",
                  p: "24px 12px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(data.images)}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "260px",
                    overflow: "hidden",
                    borderRadius: "16px",
                    position: "relative",
                  }}
                >
                  {imageLoading[data._id] !== false && (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      sx={{ position: "absolute", top: 0, left: 0 }}
                    />
                  )}
                  {data.images && data.images.length > 0 ? (
                    <img
                      src={data.images[0].src}
                      alt={data.name}
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: "cover",
                        display:
                          imageLoading[data._id] === false ? "block" : "none",
                      }}
                      onLoad={() => handleImageLoad(data._id)}
                      onError={() => handleImageError(data._id)}
                    />
                  ) : (
                    <Typography>No Image Available</Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "24px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "700 !important" }}
                  >
                    {data.name}
                  </Typography>
                  <Box sx={PointSx}>
                    <Box sx={IconBoxSx}>
                      <AlbumIcon />
                    </Box>
                    <Typography variant="body2" color={"text.secondary"}>
                      {data.images
                        ? `${data.images.length} images`
                        : "No images"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
      <GalleryView
        handleClose={handleClose}
        open={open}
        galleryImages={selectedImages}
      />
    </Grid>
  );
}
