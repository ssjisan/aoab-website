import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import toast from "react-hot-toast";

import { Cross } from "../../../assets/Icons";
import api from "../../../lib/api/axios";

export default function SignatureUpload({
  open,
  onClose,
  currentImage,
  onSuccess,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // SET CURRENT IMAGE
  // --------------------------------------------------
  useEffect(() => {
    setSelectedImage(currentImage || null);
  }, [currentImage]);

  // --------------------------------------------------
  // HANDLE FILE CHANGE
  // --------------------------------------------------
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    const maxSize = 1 * 1024 * 1024; // 1MB

    // TYPE VALIDATION
    if (!validFormats.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, and WEBP formats are supported.");
      return;
    }

    // SIZE VALIDATION
    if (file.size > maxSize) {
      toast.error("File size must be 1MB or less.");
      return;
    }

    // PREVIEW
    const previewUrl = URL.createObjectURL(file);

    setSelectedImage(previewUrl);
    setImageFile(file);
  };

  // --------------------------------------------------
  // HANDLE UPLOAD
  // --------------------------------------------------
  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select a signature image first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("signature", imageFile);

      const response = await api.post("/update-signature", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newUrl = response.data?.signature?.url;

      toast.success("Signature uploaded successfully!");

      if (newUrl) {
        setSelectedImage(newUrl);
      }

      setImageFile(null);

      // SEND TO PARENT
      if (typeof onSuccess === "function") {
        onSuccess(newUrl);
      }

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to upload signature",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: {
              xs: "95%",
              sm: "92%",
              md: "720px",
            },

            maxWidth: "720px",

            maxHeight: {
              xs: "92vh",
              sm: "88vh",
            },

            overflow: "hidden",

            bgcolor: "#fff",

            borderRadius: {
              xs: "18px",
              sm: "22px",
            },

            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.18)",

            display: "flex",
            flexDirection: "column",

            outline: "none",
          }}
        >
          {/* ===================================== */}
          {/* HEADER */}
          {/* ===================================== */}
          <Box
            sx={{
              px: { xs: 1.5, sm: 2 },
              py: { xs: 2, sm: 1.5 },

              borderBottom: "1px solid #E5E7EB",

              position: "relative",

              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "24px",
                },

                fontWeight: 800,
                color: "#072439",
                pr: 6,
              }}
            >
              Upload Signature
            </Typography>

            <Typography
              sx={{
                mt: 1,

                fontSize: {
                  xs: "13px",
                  sm: "14px",
                },

                color: "#6B7280",
                lineHeight: 1.7,
              }}
            >
              Upload a clean and clear image of your signature for verification
              purposes.
            </Typography>

            {/* FIXED CLOSE BUTTON */}
            <IconButton
              onClick={() => onClose()}
              sx={{
                position: "absolute",
                top: 14,
                right: 14,

                width: 42,
                height: 42,

                backgroundColor: "rgba(0,0,0,0.06)",

                zIndex: 10,

                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.12)",
                },
              }}
            >
              <Cross size="20" color="#000" />
            </IconButton>
          </Box>

          {/* ===================================== */}
          {/* BODY */}
          {/* ===================================== */}
          <Stack
            spacing={1}
            sx={{
              p: {
                xs: 1.5,
                sm: 2,
              },

              overflowY: "auto",
            }}
          >
            {/* FILE INPUT */}
            <input
              type="file"
              id="signature-upload"
              hidden
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={handleFileChange}
            />

            {/* UPLOAD AREA */}
            <label htmlFor="signature-upload">
              <Box
                sx={{
                  width: "320px",
                  height: {
                    xs: "120px",
                    sm: "200px",
                  },

                  border: selectedImage
                    ? "1px solid #E5E7EB"
                    : "2px dashed #CBD5E1",

                  borderRadius: "20px",

                  overflow: "hidden",

                  backgroundColor: selectedImage ? "#fff" : "#F8FAFC",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  cursor: "pointer",

                  transition: "all 0.25s ease",

                  "&:hover": {
                    borderColor: "#1976d2",
                    backgroundColor: "#F9FBFF",
                  },
                }}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Signature Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "20px",
                    }}
                  />
                ) : (
                  <Stack alignItems="center" spacing={1.5}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "15px",
                          sm: "18px",
                        },

                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      Click to upload signature
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#6B7280",
                        textAlign: "center",
                        lineHeight: 1.7,
                      }}
                    >
                      JPG, PNG, WEBP supported
                      <br />
                      Maximum file size 1MB
                    </Typography>
                  </Stack>
                )}
              </Box>
            </label>

            {/* TIPS */}
            <Box
              sx={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",

                p: {
                  xs: 1,
                  sm: 1.5,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#111827",
                  mb: 1.5,
                }}
              >
                💡 Tips for a Better Signature
              </Typography>

              <Stack spacing={1}>
                {[
                  "Use black ink on white paper",
                  "Capture the image in good lighting",
                  "Keep the signature centered inside the frame",
                  "Avoid shadows and blurry photos",
                ].map((tip) => (
                  <Typography
                    key={tip}
                    sx={{
                      fontSize: "13px",
                      color: "#475569",
                      lineHeight: 1.7,
                    }}
                  >
                    • {tip}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* ===================================== */}
          {/* FOOTER */}
          {/* ===================================== */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{
              p: {
                xs: 1,
                sm: 1.5,
              },

              borderTop: "1px solid #E5E7EB",

              backgroundColor: "#fff",

              flexShrink: 0,
            }}
          >
            <Button
              onClick={() => onClose()}
              variant="outlined"
              sx={{
                minWidth: {
                  xs: "110px",
                  sm: "130px",
                },

                height: 48,

                borderRadius: "14px",

                textTransform: "none",

                fontWeight: 700,
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={loading || !imageFile}
              sx={{
                minWidth: {
                  xs: "160px",
                  sm: "220px",
                },

                height: 48,

                borderRadius: "14px",

                textTransform: "none",

                fontWeight: 700,

                boxShadow: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Upload Signature"
              )}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

SignatureUpload.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  currentImage: PropTypes.string,
  onSuccess: PropTypes.func,
};
