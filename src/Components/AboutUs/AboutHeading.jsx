import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Chip from "../Common/Chip";

export default function AboutHeading() {
  return (
    <Container sx={{ pt: "140px", pb: "64px" }}>
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
              src="https://res.cloudinary.com/dzcpx6hrf/image/upload/v1739682272/aoab/website/l9jkc18krhjexca5cafb.jpg"
              alt="About Us"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack
            sx={{
              p: "48px 32px",
              background: "rgba(0, 50, 88, 0.08)",
              height: "480px",
              borderRadius: "12px",
            }}
            justifyContent="space-between"
          >
            <Stack gap="16px" justifyContent="space-between" sx={{height:"100%"}}>
              <Stack gap="8px">
                <Chip chip={"About Us"} />
                <Typography variant="h2">
                  Tailored solutions for better care of the injured
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.secondary">
                We are a non profit organization dedicated to
                strengthening care of the injured in over 30 low- and
                middle-income countries.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
