import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Cross } from "../../../assets/Icons";

import toast from "react-hot-toast";
import PropTypes from "prop-types";
import api from "../../../lib/api/axios";

export default function ImageUpload({
  open,
  toggleDrawer,
  currentImage,
  onSuccess,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedImage(currentImage || null);
  }, [currentImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!validFormats.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG formats are supported.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must be 1MB or less.");
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("picture", imageFile);

    try {
      const response = await api.post("/update-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrl = response.data.picture?.[0]?.url || selectedImage;

      toast.success("Profile image updated successfully!");
      setSelectedImage(uploadedUrl);
      setImageFile(null);
      toggleDrawer(false)();

      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(uploadedUrl); // Notify parent
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to upload profile image",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      <Stack sx={{ width: "380px" }}>
        <Stack
          sx={{ p: 2, borderBottom: "1px solid rgba(145, 142, 175, 0.24)" }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Upload Image
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>

        <Stack sx={{ p: 3 }} gap={3}>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            style={{ display: "none" }}
            id="file-upload"
            onChange={handleFileChange}
          />

          <label htmlFor="file-upload">
            <Box
              sx={{
                width: "240px",
                height: "280px",
                border: "1px dashed grey",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: selectedImage ? "transparent" : "#f1f1f1",
              }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Profile preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Typography color="textSecondary">
                  Click to upload an image
                </Typography>
              )}
            </Box>
          </label>

          <Typography sx={{ fontSize: "12px" }} color="textSecondary">
            Supported formats: JPG, JPEG, PNG | Max size: 1MB
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={handleUpload}
            disabled={loading || !imageFile}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Image"
            )}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

ImageUpload.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  currentImage: PropTypes.string,
  onSuccess: PropTypes.func, // New prop
};
