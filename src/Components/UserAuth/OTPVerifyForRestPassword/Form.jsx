import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Form() {
  const { email } = useContext(DataContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [resendLoading, setResendLoading] = useState(false); // State for resend button loading

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setResendDisabled(false); // Enable resend button after 120 sec
    }
  }, [timeLeft]);

  // Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/verify-otp-for-reset", {
        email,
        otp,
      });

      if (
        response.data.message ===
        "OTP verified. You can now reset your password."
      ) {
        toast.success("OTP verified successfully!");
        navigate("/reset-password");
      } else {
        toast.error(response.data.message || "Invalid OTP. Try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    setResendLoading(true); // Show loader
    setResendDisabled(true); // Prevent multiple clicks

    try {
      await axios.post("/resend-otp", { email });
      toast.success("OTP sent again. Check your email.");
      setTimeLeft(120); // Restart countdown timer
    } catch (error) {
      toast.error("Failed to resend OTP. Try again.");
      setResendDisabled(false); // Re-enable button if failed
    } finally {
      setResendLoading(false); // Hide loader after request
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        sx={{ pt: "120px", width: "480px", maxWidth: "100%", pb: "48px" }}
        alignItems="center"
        gap="48px"
        component="form"
        onSubmit={handleOtpVerify}
      >
        <Stack justifyContent="center" sx={{ textAlign: "center" }} gap="8px">
          <Typography variant="h3">Reset Password</Typography>
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
          <Stack sx={{p:"8px", background:'#d7e6fc', textAlign:"center", borderRadius:"12px", color:"#003768"}}>
            <Typography>
            Please check your Spam or Other folder if you don't see the OTP in your inbox.
            </Typography>
          </Stack>
          <Stack gap="8px">
            <Typography sx={{fontWeight:"600"}}>One Time Password (OTP)</Typography>
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
