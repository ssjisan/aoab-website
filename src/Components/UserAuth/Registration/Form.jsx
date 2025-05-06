import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { EyeOff, EyeOn } from "../../../assets/Icons";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const [name, setName] = useState("");
  const [bmdcNo, setBmdcNo] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setRegistrationLoading(true);

    try {
      const { data } = await axios.post("/registration", {
        name,
        bmdcNo,
        email,
        contactNumber,
        password,
        confirmPassword,
      });

      if (data?.error) {
        setRegistrationLoading(false);
        toast.error(data.error || "An error occurred. Please try again.");
      } else {
        toast.success(data.message);
        navigate("/verify-otp", { state: { email } });
      }
    } catch (err) {
      setRegistrationLoading(false);
      if (err.response && err.response.data) {
        toast.error(
          err.response.data.error || "An error occurred. Please try again."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent:"center"}}
    >
      <Stack
        sx={{
          pt:"80px",
          width: "480px",
          maxWidth: "100%",
          pb: "48px",
        }}
        alignItems="center"
        gap="24px"
        component="form"
        onSubmit={handleRegistration}
      >
        <Stack justifyContent="center" sx={{ textAlign: "center" }} gap="4px">
          <Typography variant="h4">Registration</Typography>
          <Typography color="text.secondary" variant="h6">
            Create an account for enroll our courses.
          </Typography>
        </Stack>
        <Stack sx={{ width: "100%" }} gap="16px">
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>Name *</Typography>
            <TextField
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Stack>
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>
              BM&DC Registration No *
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={bmdcNo}
              type="number"
              onChange={(e) => setBmdcNo(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">A-</InputAdornment>
                  ),
                },
              }}
            />
            <Typography
              sx={{ fontSize: "13px !important" }}
              color="text.secondary"
            >
              Please enter your BM&DC Registration No without the &apos;A-&apos;
              prefix. Only the digits should be entered.
            </Typography>
          </Stack>
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>Email *</Typography>
            <TextField
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>Contact Number *</Typography>
            <TextField
              variant="outlined"
              size="small"
              value={contactNumber}
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">+880</InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <Typography
              sx={{ fontSize: "13px !important" }}
              color="text.secondary"
            >
              Please enter your contact number without the +880 prefix. Only the
              digits should be entered.
            </Typography>
          </Stack>
          <Stack gap="8px">
            <Typography sx={{ fontWeight: "600" }}>Password *</Typography>
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
                        onClick={handleShowPassword}
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
                least 1 letter, 1 number, and 1 special character.
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
                      onClick={handleShowConfirmPassword}
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
              registrationLoading && (
                <CircularProgress size={24} sx={{ color: "#ffffff" }} />
              )
            }
          >
            {registrationLoading ? "Creating..." : "Create"}
          </Button>
        </Stack>
        <Typography color="text.secondary">
          Already have an account?{" "}
          <Link to="/login">
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#9C27B0",
                fontWeight: 600,
              }}
            >
              Login
            </Box>
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}
