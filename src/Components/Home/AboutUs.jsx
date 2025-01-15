import { Box, Container, Grid, Stack } from "@mui/material";
import SectionContent from "../Common/SectionContent";

export default function AboutUs() {
  return (
    <Container sx={{ pt: "64px", pb: "64px" }}>
      <Stack gap="64px">
        <SectionContent
          chip="About Us"
          title="Driving knowledge development and transfer in trauma and orthopedic care."
          subTitle="The AO Alliance is a nonprofit dedicated to improving fracture care by reducing suffering, disability, and poverty through sustainable programs."
        />
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
                src="/about-us01.png"
                alt="About Us"
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <img
                src="/about-us02.png"
                alt="About Us"
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
