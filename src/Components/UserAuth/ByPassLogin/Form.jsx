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

  // -------------------- BYPASS LOGIN --------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // call bypass-login endpoint with { email, bypassPassword }
      const { data } = await axios.post("/student/bypass-login", {
        email,
        bypassPassword: password,
      });

      // server may respond with { error } on failure
      if (data?.error) {
        toast.error(data.error || "An error occurred. Please try again.");
        setLoading(false);
        return;
      }

      // expected success: { token, user, ... }
      localStorage.setItem("auth", JSON.stringify(data));
      setAuth((prevAuth) => ({
        ...prevAuth,
        token: data.token,
        user: data.user,
      }));

      toast.success("Bypass Login Successful");

      // Redirect to previous page or default home
      navigate(from, { replace: true });

      // clear form
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Bypass login error:", err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.error || "An error occurred. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  // ------------------ END BYPASS LOGIN ------------------

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
          <Typography variant="h4">Bypass Login</Typography>
          <Typography color="text.secondary" variant="h6">
            Use the temporary bypass password provided by admin
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
            <Typography sx={{ fontWeight: "600" }}>Bypass Password *</Typography>
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
      </Stack>
    </Container>
  );
}
