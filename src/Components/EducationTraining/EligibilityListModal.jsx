// components/EligibilityListModal.jsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

export default function EligibilityListModal({
  open,
  onClose,
  success,
  messages = [],
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {success ? "You are eligible ✅" : "Eligibility Check Failed ❌"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack gap={2}>
          {messages.map((msg, index) => (
            <Typography
              key={index}
              variant="body2"
              color={success ? "green" : "error"}
            >
              • {msg}
            </Typography>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
