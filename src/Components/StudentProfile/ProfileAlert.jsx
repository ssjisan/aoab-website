import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import { Cross, Warning } from "../../assets/Icons";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ProfileAlert({ profile }) {
  const [open, setOpen] = useState(false);

  const getMissingFields = () => {
    if (!profile) return [];

    const missing = [];

    const hasPicture = Array.isArray(profile.picture) && profile.picture.length > 0;
    if (!hasPicture) missing.push("Profile picture");

    const workingPlace = profile.currentWorkingPlace?.[0];
    if (!workingPlace?.name) missing.push("Current working place name");
    if (!workingPlace?.designation) missing.push("Current designation");

    const pg = profile.postGraduationDegrees?.[0];
    if (!pg?.degreeName) missing.push("Post-graduation degree name");
    if (!pg?.yearOfGraduation) missing.push("Year of post-graduation");

    return missing;
  };

  useEffect(() => {
    if (getMissingFields().length > 0) {
      setOpen(true);
    }
  }, [profile]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          borderRadius: "12px",
          width: "560px",
          maxWidth: "90%",
          boxShadow: 24,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Action Required: Complete Your Profile
          </Typography>
          <IconButton onClick={() => setOpen(false)} size="small">
            <Cross size="24" color="black" />
          </IconButton>
        </Box>

        {/* Content */}
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ px: 4, py: 3 }}
        >
          <Warning size="48px" color="#dc3545" />

          <Typography variant="body1" sx={{ fontWeight: 500, textAlign: "center" }}>
            To proceed with course enrollment or approval, please complete your
            profile by adding the missing fields below:
          </Typography>

          {/* Missing Fields List */}
          <Box sx={{ width: "100%", pl: 2 }}>
            {getMissingFields().map((field, idx) => (
              <Typography
                key={idx}
                variant="body1"
                sx={{
                  mb: "16px",
                  display: "flex",
                  alignItems: "center",
                  color: "#dc3545",
                  fontWeight: 500,
                }}
              >
                <Box component="span" sx={{ mr: 1 }}>❌</Box> {field}
              </Typography>
            ))}
          </Box>
        </Stack>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid rgba(145, 158, 171, 0.24)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "gray", textAlign: "center" }}>
            Please update your profile to continue.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

ProfileAlert.propTypes = {
  profile: PropTypes.shape({
    picture: PropTypes.arrayOf(PropTypes.string),
    currentWorkingPlace: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        designation: PropTypes.string,
      })
    ),
    postGraduationDegrees: PropTypes.arrayOf(
      PropTypes.shape({
        degreeName: PropTypes.string,
        yearOfGraduation: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })
    ),
  }),
};
