import { Box, Container, Grid, Stack, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <Container sx={{ pt: "64px", pb: "64px" }}>
      <Stack gap="64px">
        <Grid container>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Stack gap="16px">
              <Stack gap="8px">
                <Stack
                  sx={{
                    padding: "4px 16px",
                    borderRadius: "100px",
                    backgroundColor: "rgba(0, 50, 88, 0.16)",
                    width: "fit-content",
                  }}
                >
                  <Typography
                    color="primary"
                    sx={{
                      fontWeight: 400,
                      lineHeight: "14px",
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                    }}
                  >
                    About Us
                  </Typography>
                </Stack>
                <Typography variant="h2">
                  Pioneer in knowledge development and transfer for trauma and
                  orthopedic care in Bangladesh.
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.secondary">
                The AO Alliance is a non profit organisation dedicated to
                improving fracture care by reducing suffering, disability, and
                poverty through sustainable programs.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
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
                src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682272/aoab/website/wvt96z1crjjq8yhclzen.png"
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
                src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682272/aoab/website/ebavsglod1ie1ffa2j7r.png"
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
