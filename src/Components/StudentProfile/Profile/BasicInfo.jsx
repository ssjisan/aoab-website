import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import BasicInfoDrawer from "./BasicInfoDrawer";
import { useState } from "react";

export default function BasicInfo({ profile }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  return (
    <Stack
      sx={{
        borderRadius: "12px",
        border: "1px solid #05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "16px",
      }}
      gap="16px"
    >
      <Stack
        sx={{ p: "8px" }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          Basic Info
        </Typography>
        <Button variant="soft" onClick={toggleDrawer(true)}>
          Edit
        </Button>
      </Stack>
      <Stack gap="8px">
        <Typography
          variant="body1"
          sx={{ fontWeight: "600" }}
          color="text.secondary"
        >
          Name
        </Typography>
        <TextField
          variant="outlined"
          sx={{
            width: { sm: "100%", lg: "calc(50% - 32px)" }, // 100% on small screens and 50% on larger screens
          }}
          size="small"
          value={profile?.name}
          disabled
        />
      </Stack>
      <Stack gap="8px">
        <Typography
          variant="body1"
          sx={{ fontWeight: "600" }}
          color="text.secondary"
        >
          BM&DC Registration No
        </Typography>
        <TextField
          sx={{
            width: { sm: "100%", lg: "calc(50% - 32px)" }, // 100% on small screens and 50% on larger screens
          }}
          variant="outlined"
          size="small"
          value={profile?.bmdcNo}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {profile?.isBmdcVerified === null
                  ? "🔄"
                  : profile?.isBmdcVerified === true
                  ? "✅"
                  : profile?.isBmdcVerified === false
                  ? "❌"
                  : null}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack gap="8px">
        <Typography
          variant="body1"
          sx={{ fontWeight: "600" }}
          color="text.secondary"
        >
          Email
        </Typography>
        <TextField
          sx={{
            width: { sm: "100%", lg: "calc(50% - 32px)" }, // 100% on small screens and 50% on larger screens
          }}
          variant="outlined"
          size="small"
          value={profile?.email}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {profile?.isEmailVerified === true ? "✅" : "❌"}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack gap="8px">
        <Typography
          variant="body1"
          sx={{ fontWeight: "600" }}
          color="text.secondary"
        >
          Contact Number
        </Typography>
        <TextField
          sx={{
            width: { sm: "100%", lg: "calc(50% - 32px)" }, // 100% on small screens and 50% on larger screens
          }}
          variant="outlined"
          size="small"
          value={profile?.contactNumber}
          disabled
        />
      </Stack>

      <Stack
        flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        gap={{ xs: "16px ", sm: "16px", md: "32px", lg: "32px" }}
      >
        <Stack gap="8px" sx={{ width: { sm: "100%", lg: "calc(50% - 32px)" } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "600" }}
            color="text.secondary"
          >
            Current Working Place
          </Typography>
          <TextField
            sx={{
              width: "100%", // Takes full width of its container (50% of the parent)
            }}
            variant="outlined"
            size="small"
            value={profile?.currentWorkingPlace?.[0]?.name || "N/A"}
            disabled
          />
        </Stack>
        <Stack gap="8px" sx={{ width: { sm: "100%", lg: "calc(50% - 32px)" } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "600" }}
            color="text.secondary"
          >
            Current Designation
          </Typography>
          <TextField
            sx={{
              width: "100%", // Takes full width of its container (50% of the parent)
            }}
            variant="outlined"
            size="small"
            value={profile?.currentWorkingPlace?.[0]?.designation || "N/A"}
            disabled
          />
        </Stack>
      </Stack>
      <Stack
        flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }} // Column on small screens, row on larger screens
        gap={{ xs: "16px ", sm: "16px", md: "32px", lg: "32px" }}
      >
        <Stack gap="8px" sx={{ width: { sm: "100%", lg: "calc(50% - 32px)" } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "600" }}
            color="text.secondary"
          >
            Post-Graduation Degree in Orthopedics
          </Typography>
          <TextField
            sx={{
              width: "100%", // Takes full width of its container (50% of the parent)
            }}
            variant="outlined"
            size="small"
            value={profile?.postGraduationDegrees?.[0]?.degreeName || "N/A"}
            disabled
          />
        </Stack>
        <Stack gap="8px" sx={{ width: { sm: "100%", lg: "calc(50% - 32px)" } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "600" }}
            color="text.secondary"
          >
            Year of Graduation
          </Typography>
          <TextField
            sx={{
              width: "100%", // Takes full width of its container (50% of the parent)
            }}
            variant="outlined"
            size="small"
            value={
              profile?.postGraduationDegrees?.[0]?.yearOfGraduation || "N/A"
            }
            disabled
          />
        </Stack>
      </Stack>
      <BasicInfoDrawer
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        profile={profile}
      />
    </Stack>
  );
}

BasicInfo.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isEmailVerified: PropTypes.string.isRequired,
    bmdcNo: PropTypes.string.isRequired,
    isBmdcVerified: PropTypes.string,
    contactNumber: PropTypes.string.isRequired,
    currentWorkingPlace: PropTypes.array,
    postGraduationDegrees: PropTypes.array,
  }).isRequired,
};
