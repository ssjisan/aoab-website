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
import axios from "axios";

export default function CertificateUpload({
  open,
  onClose,
  certificates,
  onUploadSuccess,
}) {
  const [existingCertificates, setExistingCertificates] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [removedIds, setRemovedIds] = useState([]);

  const fileInputRef = useRef(null);

   useEffect(() => {
    if (open && certificates) {
      setExistingCertificates(certificates); // ✅ use live certificates
      setNewFiles([]);
      setRemovedIds([]);
    }
  }, [open, certificates]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];

    for (let file of files) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        continue;
      }

      if (file.size > 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 1MB.`);
        continue;
      }

      validFiles.push(file);
    }

    const total =
      existingCertificates.length +
      newFiles.length +
      validFiles.length -
      removedIds.length;

    if (total > 2) {
      toast.error("You can upload a maximum of 2 certificates.");
      return;
    }

    setNewFiles((prev) => [...prev, ...validFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveExisting = (index) => {
    const cert = existingCertificates[index];
    setRemovedIds((prev) => [...prev, cert.public_id]);
    setExistingCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

const handleSubmit = async () => {
  const toastId = toast.loading("Updating certificates...");

  try {
    setIsUploading(true);
    const formData = new FormData();

    newFiles.forEach((file) => {
      formData.append("postGradCertificate", file);
    });

    removedIds.forEach((id) => {
      formData.append("removeCertificateIds", id);
    });

    const { data } = await axios.post("/upload-postgrad-certificate", formData);

    toast.success("Certificate updated successfully", { id: toastId });

    if (typeof onUploadSuccess === "function") {
      onUploadSuccess(data.postGraduationCertificates); // ✅ pass updated list
    }

    onClose();
  } catch (err) {
    console.error(err);
    toast.error("Failed to update certificates.", { id: toastId });
  } finally {
    setIsUploading(false);
  }
};


  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Stack sx={{ width: 380, maxWidth: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2, borderBottom: "1px solid rgba(145, 142, 175, 0.24)" }}
        >
          <Typography variant="h6" fontWeight={600}>
            Manage Certificates
          </Typography>
          <IconButton onClick={onClose}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>

        <Stack sx={{ p: 2 }} gap={2}>
          <Typography fontWeight={600}>
            Upload your Post Graduation Certificate (Max 2, PDF only)
          </Typography>

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
                PDF format, max 1MB
              </Typography>
            </Stack>
            <input
              type="file"
              accept="application/pdf"
              hidden
              ref={fileInputRef}
              multiple
              onChange={handleFileChange}
            />
          </Stack>

          {/* New Files */}
          {newFiles.map((file, index) => (
            <Stack
              key={index}
              direction="row"
              gap={2}
              alignItems="center"
              sx={{ p: 1 }}
            >
              <PDF />
              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Stack>
              <IconButton onClick={() => handleRemoveNew(index)}>
                <Cross color="black" size="20px" />
              </IconButton>
            </Stack>
          ))}

          {/* Existing Files */}
          {existingCertificates.map((file, index) => (
            <Stack
              key={index}
              direction="row"
              gap={2}
              alignItems="center"
              sx={{ p: 1 }}
            >
              <PDF />
              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {file.name || file.url?.split("/").pop()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Stack>
              <IconButton onClick={() => handleRemoveExisting(index)}>
                <Cross color="black" size="20px" />
              </IconButton>
            </Stack>
          ))}

          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#111827", color: "#fff" }}
            onClick={handleSubmit}
            disabled={isUploading}
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
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      public_id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  onUploadSuccess: PropTypes.func,
};