import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CertificateUpload from "./CertificateUpload";
import PropTypes from "prop-types";

export default function Certificate({ profile }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [certificates, setCertificates] = useState(
    profile.postGraduationCertificates || []
  );

  const handleUploadSuccess = (updatedCertificates) => {
    setCertificates(updatedCertificates); // ✅ Update live state
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const hasCertificates = certificates.length > 0;

  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "16px",
      }}
      flexDirection="column"
      gap="16px"
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          Post graduation certificates
        </Typography>
        <Button variant="soft" onClick={handleOpenDrawer}>
          Update
        </Button>
      </Stack>

      {/* Certificate Preview */}
      <Stack
        sx={{ width: "100%", p: "24px" }}
        direction="row"
        flexWrap="wrap"
        gap={2}
        justifyContent={hasCertificates ? "flex-start" : "center"}
      >
        {hasCertificates ? (
          certificates.map((doc, index) => {
            const pdfUrl = doc.url;
            const jpgUrl = pdfUrl.replace(".pdf", ".jpg");

            return (
              <Stack key={index} alignItems="center" spacing={1}>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={jpgUrl}
                    alt={doc.name}
                    style={{
                      width: 115,
                      height: 90,
                      border: "1px solid #ccc",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </a>
                <Typography
                  variant="body1"
                  sx={{ wordBreak: "break-word", maxWidth: 120 }}
                >
                  {doc.name || pdfUrl.split("/").pop()}
                </Typography>
              </Stack>
            );
          })
        ) : (
          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            No certificate uploaded yet.
          </Typography>
        )}
      </Stack>

      {/* Upload Drawer */}
      <CertificateUpload
        open={drawerOpen}
        onClose={handleCloseDrawer}
        profile={profile}
        certificates={certificates} // ✅ pass the current live list
        onUploadSuccess={handleUploadSuccess}
      />
    </Stack>
  );
}

Certificate.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    aoaNo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAccountVerified: PropTypes.bool,
    signature: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        public_id: PropTypes.string,
      })
    ),
    postGraduationCertificates: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        public_id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};
