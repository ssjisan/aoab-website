import { Modal, Box, Typography, Stack, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

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
      await onConfirm(); // pass control to parent
      onClose(); // close modal if successful
    } catch (error) {
      console.error("Enrollment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          width: "560px",
          maxWidth: "90%",
        }}
      >
        <Box
          sx={{
            p: "16px",
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {success ? "✅ Enrollment Confirmation" : "Enrollment Blocked"}
          </Typography>
        </Box>

        <Stack
          gap="16px"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ p: "24px 16px" }}
        >
          {!success && messages.length > 0 ? (
            <Stack gap={"16px"}>
              {messages.map((msg, index) => (
                <Stack
                  key={index}
                  flexDirection="row"
                  gap="8px"
                  alignItems="flex-start"
                >
                  <Typography sx={{ fontSize: "16px !important" }}>
                    ❌
                  </Typography>
                  <Typography sx={{ fontSize: "16px !important" }}>
                    {msg}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : success ? (
            <Stack flexDirection="row" gap="8px" alignItems="flex-start">
              <Typography sx={{ fontSize: "16px !important" }}>
                Are you sure you want to enroll in <strong>{title}</strong>?
              </Typography>
            </Stack>
          ) : (
            <Typography>No messages available.</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          gap="16px"
          justifyContent={"flex-end"}
          sx={{ p: "16px", borderTop: "1px solid rgba(145, 158, 171, 0.24)" }}
        >
          <Button
            onClick={onClose}
            color="inherit"
            variant={success ? "text" : "soft"}
            disabled={loading}
          >
            Cancel
          </Button>
          {success && (
            <Button
              onClick={handleConfirm}
              variant="contained"
              disabled={loading}
            >
              {loading ? "Enrolling..." : "Confirm"}
            </Button>
          )}
        </Stack>
      </div>
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
