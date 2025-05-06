import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import { EyeOff, EyeOn } from "../../../assets/Icons";
import axios from "axios"; // Make sure axios is installed
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const { email, sendingOtp, setEmail } = useContext(DataContext); // You may need to adjust `sendingOtp` if it's not available.
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // For handling loading state
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!password || !confirmPassword) {
      toast.error("Both password fields are required."); // Show toast for error
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match."); // Show toast for error
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character."
      ); // Show toast for error
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/reset-password", {
        email,
        newPassword: password,
        confirmPassword,
      });

      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
        toast.success("Password reset successfully."); // Show toast for success
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage); // Show toast for error
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
        onSubmit={handleSubmit} // Bind handleSubmit to form submission
      >
        <Stack justifyContent="center" sx={{ textAlign: "center" }} gap="8px">
          <Typography  variant="h4">Reset Password</Typography>
          <Typography color="text.secondary" variant="h6">
            Please enter your new password.
          </Typography>
        </Stack>
        <Stack sx={{ width: "100%" }} gap="24px">
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>New Password *</Typography>
            <Stack gap="8px">
              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
                size="small"
              >
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <EyeOff color="#918EAF" size="20px" />
                        ) : (
                          <EyeOn color="#918EAF" size="20px" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Typography
                sx={{ fontSize: "13px !important" }}
                color="text.secondary"
              >
                The password must be at least 8 characters long and include at
                least 1 letter and 1 number.
              </Typography>
            </Stack>
          </Stack>
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>
              Confirm Password *
            </Typography>
            <FormControl sx={{ width: "100%" }} variant="outlined" size="small">
              <OutlinedInput
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <EyeOff color="#918EAF" size="20px" />
                      ) : (
                        <EyeOn color="#918EAF" size="20px" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
          <Button
            variant="contained"
            type="submit"
            startIcon={
              loading && (
                <CircularProgress size={24} sx={{ color: "#ffffff" }} />
              )
            }
            disabled={loading}
          >
            {loading ? "Resting..." : "Reset Password"}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
