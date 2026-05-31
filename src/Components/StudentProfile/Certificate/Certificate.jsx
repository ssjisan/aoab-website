import { Button, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CertificateUpload from "./CertificateUpload";
import PropTypes from "prop-types";
import PDF from "../../../assets/PDF";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import FilePreviewModal from "../FilePreviewModal";

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
          background: "#fff",
          height: "100%",
        }}
        flexDirection="column"
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: "12px 16px",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#003258",
            }}
          >
            Post Graduation Certificates
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={() => setDrawerOpen(true)}
          >
            Upload Certificate
          </Button>
        </Stack>

        {/* Content */}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          sx={{
            px: 2,
            pb: 2,
          }}
        >
          {hasCertificates ? (
            <Stack
              alignItems="center"
              spacing={1}
              sx={{
                width: 180,
                p: 1,
              }}
            >
              {/* PDF Card */}
              <Stack
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

                  "&:hover .certificate-overlay": {
                    opacity: 1,
                    visibility: "visible",
                  },
                }}
                alignItems="center"
                justifyContent="center"
              >
                <PDF />

                {/* Hover Overlay */}
                <Stack
                  className="certificate-overlay"
                  direction="column"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(15, 23, 42, 0.2)",
                    backdropFilter: "blur(2px)",
                    opacity: 0,
                    visibility: "hidden",
                    transition: "all 0.25s ease",
                    p: "12px",
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPdfOpen(true);
                    }}
                  >
                    View
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload();
                    }}
                    sx={{
                      bgcolor: "#fff",
                      borderColor: "#fff",
                      color: "#111827",
                      width: "100%",
                      "&:hover": {
                        bgcolor: "#f3f4f6",
                        borderColor: "#f3f4f6",
                      },
                    }}
                  >
                    Download
                  </Button>
                </Stack>
              </Stack>

              {/* File Name */}
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

              {/* File Size */}
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
        <CertificateUpload
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          certificate={certificates}
          onUploadSuccess={handleUploadSuccess}
        />
      </Stack>

      <FilePreviewModal
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        title={certificates?.name || "Certificate"}
        url={certificates?.url}
      />
    </>
  );
}

Certificate.propTypes = {
  profile: PropTypes.object,
};
