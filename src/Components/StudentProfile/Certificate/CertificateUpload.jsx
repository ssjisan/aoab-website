import {
  Drawer,
  Stack,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
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
      toast.error("File is too large. Max 5MB allowed.");
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
    console.log("NEW FILE:", newFile);
    console.log("TYPE:", typeof newFile);
    console.log("IS FILE:", newFile instanceof File);
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

      toast.success("Certificate updated successfully", {
        id: toastId,
      });

      setExistingFile(data.postGraduationCertificates);

      setNewFile(null);

      if (typeof onUploadSuccess === "function") {
        onUploadSuccess(data.postGraduationCertificates);
      }

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload certificate", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Stack sx={{ width: 380, maxWidth: "100%" }}>
        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: 2,
            borderBottom: "1px solid rgba(145, 142, 175, 0.24)",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Manage Certificate
          </Typography>

          <IconButton onClick={onClose}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>

        <Stack sx={{ p: 2 }} gap={2}>
          <Typography fontWeight={600}>
            Upload Post Graduation Certificate (PDF only)
          </Typography>

          {/* UPLOAD BOX */}
          <Stack
            component="label"
            sx={{
              border: "1px dashed rgba(145, 158, 171, 0.32)",
              borderRadius: "12px",
              p: 2,
              cursor: "pointer",
              alignItems: "center",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Upload />

            <Stack>
              <Typography>Select file</Typography>
              <Typography variant="caption" color="text.secondary">
                PDF format, max 5MB
              </Typography>
            </Stack>

            <input
              type="file"
              accept="application/pdf"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Stack>

          {/* EXISTING FILE */}
          {existingFile?.url && !newFile && (
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
              sx={{
                p: 1,
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 1,
              }}
            >
              <PDF />

              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {existingFile.name || "Current Certificate"}
                </Typography>

                {existingFile.size && (
                  <Typography variant="caption" color="text.secondary">
                    {(existingFile.size / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                )}
              </Stack>

              <IconButton onClick={() => setExistingFile(null)}>
                <Cross color="black" size="20px" />
              </IconButton>
            </Stack>
          )}

          {/* NEW FILE */}
          {newFile && (
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
              sx={{
                p: 1,
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 1,
              }}
            >
              <PDF />

              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {newFile.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {(newFile.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Stack>

              <IconButton onClick={handleRemoveNew}>
                <Cross color="black" size="20px" />
              </IconButton>
            </Stack>
          )}

          {/* SAVE BUTTON */}
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#111827",
              color: "#fff",
            }}
            onClick={handleSubmit}
            disabled={isUploading || !newFile}
          >
            {isUploading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

CertificateUpload.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  // now SINGLE object instead of array
  certificate: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
  }),

  onUploadSuccess: PropTypes.func,
};
