import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Chip from "../Common/Chip";

export default function MissionVision() {
  return (
    <Container sx={{ pt: "64px", pb: "64px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <img
              src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682271/aoab/website/kmqnetf5xlc9xrdoprqj.webp"
              alt="About Us"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack
            sx={{
              p: "36px 24px",
              background: "rgba(0, 50, 88, 0.08)",
              height: "480px",
              borderRadius: "12px",
            }}
            justifyContent="space-between"
          >
            <Stack
              gap="16px"
              justifyContent="space-between"
              sx={{ height: "100%" }}
            >
              <Stack gap="8px">
                <Chip chip={"Key principle"} />
                <Typography variant="h3">
                  PARTNERSHIP · EMPOWERMENT · SUSTAINABILITY
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.primary">
                Our key principle is investment in local capacity – empowering
                surgeons and other healthcare workers in their own countries by
                providing a framework for them to practice their specialty and
                improve their skills.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <img
              src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682271/aoab/website/aeqjibtnjnfjb7lr0nk2.webp"
              alt="About Us"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Stack
            sx={{
              p: "24px",
              background: "rgba(0, 50, 88, 0.08)",
              height: "360px",
              borderRadius: "12px",
            }}
            justifyContent="space-between"
          >
            <Stack
              gap="16px"
              justifyContent="space-between"
              sx={{ height: "100%" }}
            >
              <Stack gap="8px">
                <Chip chip={"Vision"} />
              </Stack>
              <Typography variant="h6" color="text.primary">
                We envision a world where timely and appropriate fracture care
                is accessible to everyone.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <img
              src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682273/aoab/website/lezr2ioeon3hcejazznq.webp"
              alt="About Us"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Stack
            sx={{
              p: "24px",
              background: "rgba(0, 50, 88, 0.08)",
              height: "360px",
              borderRadius: "12px",
            }}
            justifyContent="space-between"
          >
            <Stack
              gap="16px"
              justifyContent="space-between"
              sx={{ height: "100%" }}
            >
              <Stack gap="8px">
                <Chip chip={"Mission"} />
              </Stack>
              <Typography variant="h6" color="text.primary">
                Our mission is to reduce human suffering, disability, and
                poverty by implementing programs that enhance local fracture
                care capacity for sustainable impact.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
