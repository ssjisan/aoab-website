import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Form() {
  const { setAuth } = useContext(DataContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const navigate = useNavigate();
  const location = useLocation();
  const [resendLoading, setResendLoading] = useState(false); // State for resend button loading
  const email = location?.state?.email;
  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/verify-otp", { email, otp });

      // Log the response data to see its structure
      console.log("OTP Response Data: ", data);

      // Handle success case: Check if the token and user exist in the response
      if (data?.token && data?.user) {
        toast.success("OTP Verified Successfully!");

        // Save token & user data in local storage
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth((prevAuth) => ({
          ...prevAuth,
          token: data.token,
          user: data.user,
        }));

        navigate("/profile"); // Redirect to the profile page
      } else {
        // If response doesn't contain expected success data, show an error
        toast.error(data?.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      // Log the error response for debugging
      console.log("Error Response: ", err);

      if (err.response && err.response.data) {
        toast.error(
          err.response.data.message || "An error occurred. Please try again."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    setResendLoading(true); // Show loader

    try {
      await axios.post("/resend-otp", { email });
      toast.success("OTP sent again. Check your email.");
      setTimeLeft(120); // Restart countdown timer
    } catch (error) {
      toast.error("Failed to resend OTP. Try again.");
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        sx={{ pt: "120px", width: "480px", maxWidth: "100%", pb: "48px" }}
        alignItems="center"
        gap="48px"
        component="form"
        onSubmit={handleVerifyOtp}
      >
        <Stack justifyContent="center" sx={{ textAlign: "center" }} gap="8px">
          <Typography variant="h3">Account Verification</Typography>
          <Typography color="text.secondary">
            Please enter the OTP to verify your account.
          </Typography>
        </Stack>
        <Stack sx={{ width: "100%" }} gap="24px">
          <Typography
            color="text.primary"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            Please enter the&nbsp;
            <Box component="span" sx={{ fontWeight: "700 !important" }}>
              One-Time Password (OTP)
            </Box>
            &nbsp;sent to your email&nbsp;
            <Box component="span" sx={{ fontWeight: "700 !important" }}>
              {email}
            </Box>
          </Typography>
          <Stack
            sx={{
              p: "8px",
              background: "#d7e6fc",
              textAlign: "center",
              borderRadius: "12px",
              color: "#003768",
            }}
          >
            <Typography>
              Please check your Spam or Other folder if you don't see the OTP in
              your inbox.
            </Typography>
          </Stack>
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>
              One Time Password (OTP)
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Stack>

          <Stack gap="8px">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={
                loading && (
                  <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                )
              }
            >
              Verify
            </Button>
            <Typography
              color="text.secondary"
              sx={{
                textAlign: "center",
              }}
            >
              {timeLeft > 0 ? (
                <>
                  OTP will expire in{" "}
                  <strong>{`${String(Math.floor(timeLeft / 60)).padStart(
                    2,
                    "0"
                  )}:${String(timeLeft % 60).padStart(2, "0")}`}</strong>
                </>
              ) : (
                <Button
                  onClick={handleResendOtp}
                  disabled={resendLoading} // Disable button only while loading
                  sx={{ color: "#9C27B0", fontWeight: 600, width: "100%" }}
                >
                  {resendLoading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#9C27B0", mr: 1 }}
                      />
                      Sending OTP...
                    </>
                  ) : (
                    "Didn’t receive OTP? Request again"
                  )}
                </Button>
              )}
            </Typography>{" "}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
