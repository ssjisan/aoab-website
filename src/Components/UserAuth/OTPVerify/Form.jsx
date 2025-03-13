import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Form() {
  const { email, setAuth } = useContext(DataContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("OTP প্রদান করুন");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/verify-otp", {
        email,
        otp: otp.toString().trim(),
      });

      const user = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      };
      // Save token & user in context and localStorage
      setAuth((prev) => ({ ...prev, token: data.token, user }));
      localStorage.setItem("auth", JSON.stringify({ token: data.token, user }));
      toast.success("ভেরিফিকেশন সফল!");
      navigate("/");
    } catch (err) {
      toast.error("ভেরিফিকেশন সফল হয়নি আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

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
        onSubmit={handleOtpVerify}
      >
        <Stack justifyContent="center" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Account Verification</Typography>
          <Typography color="text.secondary">
          Please enter the OTP to verify your account.
          </Typography>
        </Stack>
        <Stack sx={{ width: "100%" }} gap="24px">
          <Typography
            color="text.primary"
            variant="h5"
            sx={{ textAlign: "center" }}
          >
            Please enter the&nbsp;
            <Box component="span" sx={{ fontWeight: "700 !important" }}>
              One-Time Password (OTP)
            </Box>
            &nbsp;sent to your email:&nbsp;
            <Box component="span" sx={{ fontWeight: "700 !important" }}>
              {email}
            </Box>
          </Typography>

          <Stack gap="8px">
            <Typography>One Time Password (OTP)</Typography>
            <TextField
              variant="outlined"
              size="small"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Stack>
          <Button
            variant="contained"
            type="submit"
            startIcon={
              loading && (
                <CircularProgress size={24} sx={{ color: "#ffffff" }} />
              )
            }
          >
            {" "}
            Verify
          </Button>
        </Stack>
        <Typography color="text.secondary">
          That's not your email?{" "}
          <Link to="/registration">
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#9C27B0",
                fontWeight: 600,
              }}
            >
              Re-enter your email address.
            </Box>
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}
