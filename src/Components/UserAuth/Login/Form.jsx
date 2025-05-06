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
import { useContext, useState } from "react";
import { EyeOff, EyeOn } from "../../../assets/Icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import CircularProgress from "@mui/material/CircularProgress";

export default function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/student-login", { email, password });

      if (data?.error) {
        setLoading(false);
        toast.error(data.error || "An error occurred. Please try again.");
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth((prevAuth) => ({
          ...prevAuth,
          token: data.token,
          user: data.user,
        }));

        setLoading(false);
        toast.success("Login Successful");

        // Redirect to the previous page or default home
        navigate(from, { replace: true });

        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setLoading(false);
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
        onSubmit={handleLogin}
      >
        <Stack justifyContent="center" sx={{ textAlign: "center" }} gap="8px">
          <Typography variant="h4">Login</Typography>
          <Typography color="text.secondary" variant="h6">
            Do not share your login information with anyone
          </Typography>
        </Stack>
        <Stack sx={{ width: "100%" }} gap="24px">
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
                sx={{
                  fontSize: "13px !important",
                  textDecoration: "underline",
                }}
                color="primary"
                component="a"
                href="/forgot-password"
              >
                Forgot your password?
              </Typography>
            </Stack>
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
            {loading ? "Connecting" : "Login"}
          </Button>
        </Stack>
        <Typography color="text.secondary">
          Don&apos;t have an account?{" "}
          <Link to="/registration">
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#9C27B0",
                fontWeight: 600,
              }}
            >
              Create Account
            </Box>
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}
