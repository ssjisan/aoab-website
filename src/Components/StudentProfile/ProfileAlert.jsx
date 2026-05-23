import {
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { Cross, Warning } from "../../assets/Icons";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function ProfileAlert({ profile }) {
  const [open, setOpen] = useState(false);
  const [missingItems, setMissingItems] = useState([]);

  useEffect(() => {
    if (!profile) return;

    const missing = [];

    // ✅ Profile picture
    const hasPicture = !!profile?.picture?.url;
    if (!hasPicture) missing.push("Profile picture");

    // ✅ Current working place
    const workingPlace = profile.currentWorkingPlace?.[0];

    if (!workingPlace?.name) {
      missing.push("Current working place");
    }

    if (!workingPlace?.designation) {
      missing.push("Current designation");
    }

    // ✅ Post graduation
    const pg = profile.postGraduationDegrees;

    if (!pg?.degreeName) {
      missing.push("Post-graduation degree");
    }

    if (!pg?.yearOfGraduation) {
      missing.push("Year of graduation");
    }

    // ✅ Certificate check
    const isPGComplete = pg?.isCompleted === true;

    if (isPGComplete) {
      const hasCertificates =
        Array.isArray(profile.postGraduationCertificates) &&
        profile.postGraduationCertificates.length > 0;

      if (!hasCertificates) {
        missing.push("Post-graduation certificate");
      }
    }

    if (missing.length > 0) {
      setMissingItems(missing);
      setOpen(true);
    }
  }, [profile]);

  if (!profile || missingItems.length === 0) return null;

  return (
    <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "92%",
              sm: "560px",
            },
            borderRadius: "28px",
            overflow: "hidden",
            bgcolor: "#fff",
            boxShadow: "0 24px 80px rgba(15, 23, 42, 0.18)",
            outline: "none",
          }}
        >
          {/* Top Gradient Section */}
          <Box
            sx={{
              position: "relative",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              px: 4,
              pt: 4,
              pb: 6,
              color: "#fff",
            }}
          >
            {/* Close */}
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <Cross size="22" color="white" />
            </IconButton>

            {/* Icon */}
            <Box
              sx={{
                width: 74,
                height: 74,
                borderRadius: "22px",
                backgroundColor: "rgba(255,255,255,0.16)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Warning size="40px" color="white" />
            </Box>

            {/* Title */}
            <Typography
              sx={{
                fontSize: {
                  xs: "24px",
                  sm: "30px",
                },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Complete Your Profile
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                opacity: 0.9,
                maxWidth: "90%",
                lineHeight: 1.7,
              }}
            >
              Some important information is missing from your profile. Please
              complete these fields before continuing with enrollment or
              approval.
            </Typography>
          </Box>

          {/* White Floating Content */}
          <Box
            sx={{
              mt: "-28px",
              mx: 3,
              mb: 3,
              backgroundColor: "#fff",
              borderRadius: "24px",
              p: 3,
              border: "1px solid rgba(145, 158, 171, 0.18)",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
            }}
          >
            {/* Missing Title */}
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#111827",
                mb: 2,
                mt: 2,
              }}
            >
              Missing Information
            </Typography>

            {/* Chips */}
            <Stack direction="row" flexWrap="wrap" gap={1.2}>
              {missingItems.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item}
                  sx={{
                    borderRadius: "12px",
                    px: 1,
                    py: 2.4,
                    fontWeight: 600,
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Bottom Message */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6b7280",
                  lineHeight: 1.6,
                  flex: 1,
                  minWidth: "220px",
                }}
              >
                Updating your profile helps us verify your academic and
                professional information properly.
              </Typography>

              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: "14px",
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    background:
                      "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  },
                }}
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

ProfileAlert.propTypes = {
  profile: PropTypes.shape({
    picture: PropTypes.shape({
      url: PropTypes.string,
    }),

    currentWorkingPlace: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        designation: PropTypes.string,
      }),
    ),

    postGraduationDegrees: PropTypes.arrayOf(
      PropTypes.shape({
        degreeName: PropTypes.string,
        yearOfGraduation: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        isCompleted: PropTypes.bool,
      }),
    ),

    postGraduationCertificates: PropTypes.arrayOf(PropTypes.string),
  }),
};
