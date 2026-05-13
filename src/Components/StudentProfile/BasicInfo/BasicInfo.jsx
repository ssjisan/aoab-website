import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useState } from "react";
import BasicInfoDrawer from "./BasicInfoDrawer";
import Basic from "./Basic/Basic";
import ProfessionalInfo from "./ProfessionalInfo/ProfessionalInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";

export default function BasicInfo({ profile }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  return (
    <Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Basic profile={profile} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <ProfessionalInfo profile={profile} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <AcademicInfo profile={profile} />
        </Grid>
      </Grid>

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
            Year of Post Graduation
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
