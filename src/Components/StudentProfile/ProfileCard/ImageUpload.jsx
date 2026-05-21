import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Cross } from "../../../assets/Icons";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import api from "../../../lib/api/axios";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function ImageUpload({
  open,
  toggleDrawer,
  currentImage,
  onSuccess,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateProfileImage } = useContext(DataContext);

  useEffect(() => {
    setSelectedImage(currentImage || null);
  }, [currentImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 1 * 1024 * 1024;

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

      const uploadedUrl = response.data.picture?.url || selectedImage;

      toast.success("Profile image updated successfully!");

      updateProfileImage(uploadedUrl);

      setSelectedImage(uploadedUrl);
      setImageFile(null);
      toggleDrawer(false)();

      if (onSuccess) onSuccess(uploadedUrl);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to upload profile image",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          bgcolor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          overflow: "hidden",
          outline: "none",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #eee",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>Upload Profile Image</Typography>

          <IconButton onClick={toggleDrawer(false)}>
            <Cross size="20px" color="#333" />
          </IconButton>
        </Stack>

        {/* Body */}
        <Stack spacing={2} sx={{ p: 3 }}>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            style={{ display: "none" }}
            id="file-upload"
            onChange={handleFileChange}
          />

          <label htmlFor="file-upload" style={{ margin: "auto" }}>
            <Box
              sx={{
                height: 260,
                width: 240,
                border: "2px dashed #d0d0d0",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: selectedImage ? "transparent" : "#f8f9fa",
                overflow: "hidden",
                transition: "0.2s",
                "&:hover": {
                  borderColor: "#999",
                },
              }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography color="text.secondary">
                  Click to upload image
                </Typography>
              )}
            </Box>
          </label>

          <Typography
            sx={{ fontSize: 12, textAlign: "center" }}
            color="text.secondary"
          >
            JPG, JPEG, PNG — Max 1MB
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={handleUpload}
            disabled={loading || !imageFile}
            sx={{
              py: 1.2,
              borderRadius: "10px",
              fontWeight: 600,
            }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Upload Image"
            )}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

ImageUpload.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  currentImage: PropTypes.string,
  onSuccess: PropTypes.func,
};
