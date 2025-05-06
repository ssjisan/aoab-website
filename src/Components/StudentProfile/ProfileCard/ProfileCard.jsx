import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import ImageUpload from "./ImageUpload";
import { useState, useEffect } from "react";

export default function ProfileCard({ profile }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  useEffect(() => {
    if (profile?.picture?.[0]?.url) {
      setLoading(true);
      const img = new Image();
      img.src = profile.picture[0].url;
      img.onload = () => {
        setImageLoaded(true);
        setLoading(false);
      };
      img.onerror = () => {
        setLoading(false);
      };
    } else {
      setLoading(false);
    }
  }, [profile?.picture]);

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

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
      flexDirection={{ sm: "column", md: "row", lg: "row" }}
      gap="16px"
      alignItems={{ xs: "center", sm: "center" }}
    >
      <Box
        sx={{
          width: "80px",
          height: "80px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {loading ? (
          <CircularProgress size={40} />
        ) : (
          <Avatar
            src={imageLoaded ? profile?.picture?.[0]?.url : ""}
            alt="Profile"
            sx={{
              width: "80px",
              height: "80px",
              fontSize: "32px",
              color: "#FFF",
              bgcolor: "#000",
            }}
          >
            {profile?.name ? profile.name.charAt(0).toUpperCase() : "G"}
          </Avatar>
        )}
      </Box>
      <Stack
        gap="2px"
        sx={{
          height: "inherit",
          width: "100%",
          textAlign: { xs: "center", sm: "center", md: "left", lg: "left" },
        }}
      >
        <Stack
          flexDirection="row"
          gap="8px"
          alignItems="center"
          justifyContent={{
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "700" }}>
            {profile.name}
          </Typography>
          <Stack
            sx={{
              border:
                !profile.isAccountVerified === true && "1px dashed #919EAB",
              background: profile.isAccountVerified === true && "#004182",
              color: profile.isAccountVerified === true && "#fff",
              p: "4px 8px",
              borderRadius: "20px",
            }}
          >
            {profile.isAccountVerified === true ? (
              <Typography
                sx={{ fontSize: "12px !important", fontWeight: "600" }}
              >
                Verified
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: "12px !important", fontWeight: "600" }}
              >
                Not verified
              </Typography>
            )}
          </Stack>
        </Stack>
        <Typography variant="body1" color="text.secondary">
        {profile.isAccountVerified ? profile.aoaNo : profile.email}
        </Typography>
      </Stack>
      <Button
        sx={{ width: "180px" }}
        variant="contained"
        onClick={toggleDrawer(true)}
      >
        Upload Image
      </Button>
      <ImageUpload
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        currentImage={profile?.picture?.[0]?.url}
      />
    </Stack>
  );
}

// Prop types validation for the ProfileCard component
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    aoaNo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAccountVerified: PropTypes.boolean,
    picture: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
  }).isRequired,
};
