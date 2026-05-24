import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SignatureUpload from "./SignatureUpload";
import PropTypes from "prop-types";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function Signature() {
  const { profile } = useContext(DataContext);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const signature = profile?.signature?.url;
    if (signature) {
      setLoading(true);
      const img = new Image();
      img.src = signature;
      img.onload = () => {
        setImageUrl(signature);
        setLoading(false);
      };
      img.onerror = () => {
        setImageUrl("");
        setLoading(false);
      };
    } else {
      setImageUrl("");
      setLoading(false);
    }
  }, [profile]);

  // Called after successful upload
  const handleSignatureUpdate = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
      gap="16px"
      justifyContent="space-between"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: "12px 16px", borderBottom: "1px solid #F3F4F6" }}
      >
        <Stack direction="row" alignItems="center" gap="8px">
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#4F985C" }}>
            Your Signature
          </Typography>
        </Stack>

        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpenDrawer(true)}
        >
          Upload Signature
        </Button>
      </Stack>
      <Stack gap="8px" sx={{ width: "360px", p: "12px 16px" }}>
        <Stack
          sx={{
            p: 2,
            border: "1px solid rgba(118, 118, 118, 0.3)",
            borderRadius: "12px",
            height: "120px",
            width: "240px",
            background: imageUrl ? "transparent" : "#f1f1f1",
          }}
          justifyContent="center"
          alignItems="center"
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Signature preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography
              color="textSecondary"
              sx={{ fontSize: "12px !important" }}
            >
              No file to preview
            </Typography>
          )}
        </Stack>

        <Typography
          sx={{ fontWeight: "600", fontSize: "12px !important" }}
          color="text.secondary"
        >
          Your signature may be used on participation certificates if required.
          Please upload a clear image.
        </Typography>
      </Stack>

      <SignatureUpload
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        currentImage={imageUrl}
        onSuccess={handleSignatureUpdate}
      />
    </Stack>
  );
}

Signature.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    aoaNo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAccountVerified: PropTypes.bool,
    signature: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        public_id: PropTypes.string,
      }),
    ),
  }).isRequired,
};
