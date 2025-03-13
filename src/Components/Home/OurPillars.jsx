import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import SectionContent from "../Common/SectionContent";

export default function OurPillars() {
  return (
    <Container sx={{ pt: "64px", pb: "64px" }}>
      <Stack gap="64px">
        <SectionContent
          chip="Our Pillars"
          title="Strengthening Fracture Care Through Care, Awareness, and Policy."
          subTitle="Building a foundation for improved fracture care through Compassion, Knowledge, and Strategic Policy Implementation."
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Stack gap="24px">
              <Typography sx={{fontSize:"24px !important", fontWeight:300}}>Care</Typography>
              <Box
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "420px",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682273/aoab/website/v1udrs3ocszrjv0qmfb5.png"
                  alt="About Us"
                  style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Stack gap="24px">
              <Typography sx={{fontSize:"24px !important", fontWeight:300}}>Awarness</Typography>
              <Box
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "420px",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682274/aoab/website/dketftsp6vlzicprozze.png"
                  alt="About Us"
                  style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Stack gap="24px">
              <Typography sx={{fontSize:"24px !important", fontWeight:300}}>Policy</Typography>
              <Box
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "420px",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682272/aoab/website/dlwezuyc6st9fpp15u0i.png"
                  alt="About Us"
                  style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
