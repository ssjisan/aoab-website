import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { EyeOff, EyeOn } from "../../../assets/Icons";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(DataContext);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/change-student-password", {
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(data.message); // Show backend message

      // Logout after successful password change
      setAuth({ token: null, user: null });
      localStorage.removeItem("auth");
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        const errorData = error.response.data;
        // Display backend validation errors
        if (errorData.error) {
          toast.error(errorData.error); // Show specific error message from the backend
        } else if (errorData.message) {
          toast.error(errorData.message); // General message from backend
        } else {
          toast.error("An error occurred while updating the course.");
        }
      } else {
        toast.error("An error occurred while updating the course.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="24px">
      <Stack gap="16px">
        <Stack gap="8px">
          <Typography sx={{ fontWeight: "600" }}>Confirm Password</Typography>
          <FormControl
            sx={{ width: "100%", maxWidth: "320px" }}
            variant="outlined"
            size="small"
          >
            <OutlinedInput
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showCurrentPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowCurrentPassword}
                    edge="end"
                  >
                    {showCurrentPassword ? (
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
        <Stack gap="8px">
          <Typography sx={{ fontWeight: "600" }}>New Password</Typography>
          <Stack gap="8px">
            <FormControl
              sx={{ width: "100%", maxWidth: "320px" }}
              variant="outlined"
              size="small"
            >
              <OutlinedInput
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showNewPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? (
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
                width: "100%",
                maxWidth: "320px",
              }}
              color="text.secondary"
            >
              The password must be at least 8 characters long and include at
              least 1 letter and 1 number.
            </Typography>
          </Stack>
        </Stack>
        <Stack gap="8px">
          <Typography sx={{ fontWeight: "600" }}>Confirm Password *</Typography>
          <FormControl
            sx={{ width: "100%", maxWidth: "320px" }}
            variant="outlined"
            size="small"
          >
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
      </Stack>
      <Button
        variant="contained"
        sx={{ width: "100%", maxWidth: "320px" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </Stack>
  );
}
