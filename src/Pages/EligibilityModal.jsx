import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  Chip,
  Fade,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Cross, Warning, CheckCircle } from "../assets/Icons";

const EligibilityModal = ({
  open,
  onClose,
  onConfirm,
  messages = [],
  success = false,
  title,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            width: { xs: "92%", sm: 560 },
            borderRadius: "28px",
            overflow: "hidden",
            outline: "none",
            boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
            bgcolor: "#fff",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              position: "relative",
              px: 4,
              pt: 4,
              pb: 5,
              color: "#fff",
              background: success
                ? "linear-gradient(135deg,#10b981,#059669)"
                : "linear-gradient(135deg,#ef4444,#dc2626)",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 14,
                top: 14,
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.15)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                },
              }}
            >
              <Cross size="20px" color="#ffffff" />
            </IconButton>

            {/* ICON BADGE */}
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              {success ? (
                <CheckCircle size="40px" color="white" />
              ) : (
                <Warning size="40px" color="white" />
              )}
            </Box>

            {/* TITLE */}
            <Typography sx={{ fontSize: "24px !important", fontWeight: 800 }}>
              {success ? "You're Eligible!" : "Enrollment Blocked"}
            </Typography>

            <Typography sx={{ fontSize: "14px !important", opacity: 0.9 }}>
              {success
                ? "You meet all requirements for this course"
                : "Please fix the following issues before enrolling"}
            </Typography>
          </Box>

          {/* BODY */}
          <Box sx={{ p: 3 }}>
            {/* COURSE TITLE */}
            {title && (
              <Chip
                label={title}
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  borderRadius: "10px",
                }}
              />
            )}

            {/* SUCCESS / ERROR CONTENT */}
            {success ? (
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 600 }}>
                  Confirm your enrollment in this course
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
                  Once confirmed, your seat will be reserved immediately.
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={1.5}>
                {(Array.isArray(messages) ? messages : [messages])
                  .filter(Boolean)
                  .map((msg, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                        p: 2,
                        borderRadius: "14px",
                        background: "#fff1f2",
                        border: "1px solid #fecdd3",
                      }}
                    >
                      <Typography sx={{ color: "#ef4444", fontSize: 18 }}>
                        ●
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>{msg}</Typography>
                    </Box>
                  ))}
              </Stack>
            )}

            {/* FOOTER */}
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                fullWidth
                onClick={onClose}
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>

              {success && (
                <Button
                  fullWidth
                  onClick={handleConfirm}
                  disabled={loading}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#fff",
                    background: "linear-gradient(135deg,#10b981,#059669)",
                    "&:hover": {
                      background: "linear-gradient(135deg,#059669,#047857)",
                    },
                  }}
                  variant="contained"
                >
                  {loading ? "Enrolling..." : "Confirm Enrollment"}
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

EligibilityModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.string),
  success: PropTypes.bool,
  title: PropTypes.string,
};

export default EligibilityModal;
