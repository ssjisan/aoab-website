import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import CircularProgress from "@mui/material/CircularProgress";

export default function ForgotPasswordForm() {
  const { email, sendingOtp, setEmail, handleSubmit } = useContext(DataContext);

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        sx={{
          pt: "120px",
          width: "480px",
          maxWidth: "100%",
          pb: "48px",
        }}
        alignItems="center"
        gap="48px"
        component="form"
        onSubmit={handleSubmit} // Bind handleSubmit to form submission
      >
        <Stack justifyContent="center" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Forgot Password</Typography>
          <Typography color="text.secondary" variant="h6">
            Please enter your email to reset your password.
          </Typography>
        </Stack>
        <Stack sx={{ width: "100%" }} gap="24px">
          <Stack gap="8px">
          <Typography sx={{fontWeight:"600"}}>Email *</Typography>
            <TextField
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
          <Stack gap="8px">
            <Button
              variant="contained"
              type="submit" // Make it a submit button
              startIcon={
                sendingOtp && (
                  <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                )
              }
            >
              {sendingOtp ? "Sending OTP..." : "Send OTP"}
            </Button>
            <Button component="a" href="/login">
              Back
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
