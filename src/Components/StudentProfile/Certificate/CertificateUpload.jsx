import { useEffect, useRef, useState } from "react";
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
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import Upload from "../../../assets/Upload";
import PDF from "../../../assets/PDF";
import { Cross } from "../../../assets/Icons";
import api from "../../../lib/api/axios";

export default function CertificateUpload({
  open,
  onClose,
  certificate,
  onUploadSuccess,
}) {
  const [existingFile, setExistingFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setExistingFile(certificate || null);
      setNewFile(null);
    }
  }, [open, certificate]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (file.size > 1024 * 1024 * 5) {
      toast.error("File size must be 5MB or less.");
      return;
    }

    setNewFile(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveNew = () => {
    setNewFile(null);
  };

  const handleSubmit = async () => {
    if (!newFile) {
      toast.error("Please select a PDF file first.");
      return;
    }

    const toastId = toast.loading("Uploading certificate...");

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("certificate", newFile);

      const { data } = await api.post("/postgrad-certificate", formData);

      toast.success("Certificate uploaded successfully", {
        id: toastId,
      });

      const uploadedCertificate = data?.postGraduationCertificates;

      setExistingFile(uploadedCertificate);
      setNewFile(null);

      if (typeof onUploadSuccess === "function") {
        onUploadSuccess(uploadedCertificate);
      }

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to upload certificate",
        {
          id: toastId,
        },
      );
    } finally {
      setIsUploading(false);
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
          {/* HEADER */}
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
                  xs: "18px",
                  sm: "20px",
                },

                fontWeight: 800,
                color: "#072439",
                pr: 6,
              }}
            >
              Upload Post Graduation Certificate
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "13px",
                  sm: "14px",
                },

                color: "#6B7280",
                lineHeight: 1.7,
              }}
            >
              Upload your official post graduation certificate in PDF format.
            </Typography>

            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 14,
                right: 14,

                width: 42,
                height: 42,

                backgroundColor: "rgba(0,0,0,0.06)",

                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.12)",
                },
              }}
            >
              <Cross size="20" color="#000" />
            </IconButton>
          </Box>

          {/* BODY */}
          <Stack
            spacing={2}
            sx={{
              p: {
                xs: 1.5,
                sm: 2,
              },

              overflowY: "auto",
            }}
          >
            <input
              type="file"
              hidden
              id="certificate-upload"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {/* Upload Area */}
            <label htmlFor="certificate-upload">
              <Box
                sx={{
                  minHeight: 220,

                  border:
                    newFile || existingFile
                      ? "1px solid #E5E7EB"
                      : "2px dashed #CBD5E1",

                  borderRadius: "20px",

                  backgroundColor: newFile || existingFile ? "#fff" : "#F8FAFC",

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
                <Stack alignItems="center" spacing={2}>
                  <Upload />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      textAlign: "center",
                    }}
                  >
                    Click to Upload Certificate
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#6B7280",
                      textAlign: "center",
                      lineHeight: 1.7,
                    }}
                  >
                    PDF format only
                    <br />
                    Maximum file size 5MB
                  </Typography>
                </Stack>
              </Box>
            </label>

            {/* Existing File */}
            {existingFile?.url && !newFile && (
              <Stack
                direction="row"
                gap={2}
                alignItems="center"
                sx={{
                  p: 2,

                  borderRadius: "16px",

                  border: "1px solid #E5E7EB",

                  backgroundColor: "#F8FAFC",
                }}
              >
                <PDF />

                <Stack sx={{ flex: 1 }}>
                  <Typography
                    fontWeight={600}
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    {existingFile.name || "Current Certificate"}
                  </Typography>

                  {existingFile.size && (
                    <Typography variant="caption" color="text.secondary">
                      {(existingFile.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}

            {/* New File */}
            {newFile && (
              <Stack
                direction="row"
                gap={2}
                alignItems="center"
                sx={{
                  p: 2,

                  borderRadius: "16px",

                  border: "1px solid #E5E7EB",

                  backgroundColor: "#F8FAFC",
                }}
              >
                <PDF />

                <Stack sx={{ flex: 1 }}>
                  <Typography
                    fontWeight={600}
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    {newFile.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {(newFile.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Stack>

                <IconButton onClick={handleRemoveNew}>
                  <Cross size="20" color="#000" />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {/* FOOTER */}
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
              onClick={onClose}
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
              onClick={handleSubmit}
              disabled={isUploading || !newFile}
              sx={{
                minWidth: {
                  xs: "180px",
                  sm: "240px",
                },

                height: 48,

                borderRadius: "14px",

                textTransform: "none",

                fontWeight: 700,

                boxShadow: "none",
              }}
            >
              {isUploading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Upload Certificate"
              )}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

CertificateUpload.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  certificate: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
  }),

  onUploadSuccess: PropTypes.func,
};
