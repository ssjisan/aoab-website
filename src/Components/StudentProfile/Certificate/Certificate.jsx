import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CertificateUpload from "./CertificateUpload";
import PropTypes from "prop-types";
import PDF from "../../../assets/PDF";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { Cross } from "../../../assets/Icons";

export default function Certificate() {
  const { profile } = useContext(DataContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const [certificates, setCertificates] = useState(null);

  useEffect(() => {
    if (profile?.postGraduationCertificates) {
      setCertificates(profile.postGraduationCertificates);
    }
  }, [profile]);

  const handleUploadSuccess = (updatedCertificates) => {
    setCertificates(updatedCertificates);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(certificates.url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      // download with original filename
      link.download = certificates.name || certificates.url.split("/").pop();

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const hasCertificates = Boolean(certificates?.url?.trim());

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #05060f08",
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          p: "16px",
          background: "#fff",
        }}
        flexDirection="column"
        gap="16px"
      >
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Post graduation certificates
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={() => setDrawerOpen(true)}
          >
            Update certificate
          </Button>
        </Stack>

        {/* Certificate */}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          justifyContent={hasCertificates ? "flex-start" : "center"}
        >
          {hasCertificates ? (
            <Stack
              alignItems="center"
              spacing={1}
              sx={{
                width: 180,
              }}
            >
              {/* Preview */}
              <Stack
                onClick={() => setPdfOpen(true)}
                sx={{
                  width: "100%",
                  height: 140,
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#f8fafc",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.25s ease",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  },
                }}
                alignItems="center"
                justifyContent="center"
              >
                <PDF />
              </Stack>

              {/* Name */}
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-word",
                  textAlign: "center",
                  maxWidth: 180,
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                {certificates.name || certificates.url.split("/").pop()}
              </Typography>

              {/* Size */}
              {certificates.size && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6b7280",
                    fontSize: "11px",
                  }}
                >
                  {(certificates.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              )}

              {/* Actions */}
              <Stack direction="row" gap={1}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={"V"}
                  onClick={() => setPdfOpen(true)}
                >
                  View
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  startIcon={"D"}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Typography
              color="text.secondary"
              sx={{
                textAlign: "center",
                width: "100%",
                py: 4,
              }}
            >
              No certificate uploaded yet.
            </Typography>
          )}
        </Stack>

        {/* Upload Drawer */}
        <CertificateUpload
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          profile={profile}
          certificates={certificates}
          onUploadSuccess={handleUploadSuccess}
        />
      </Stack>

      {/* PDF Modal */}
      <Dialog
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {certificates?.name || "Certificate"}

          <IconButton onClick={() => setPdfOpen(false)}>
            <Cross size="24px" color="#000" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ height: "85vh", p: 2 }}>
          <iframe
            src={`${certificates?.url}#toolbar=0&navpanes=0&scrollbar=0`}
            width="100%"
            height="98%"
            title="PDF Viewer"
            style={{
              border: "none",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

Certificate.propTypes = {
  profile: PropTypes.object,
};
