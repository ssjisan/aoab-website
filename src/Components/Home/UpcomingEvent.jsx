import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Chip from "../Common/Chip";

export default function UpcomingEvent() {
  return (
    <Container sx={{ pt: "64px", pb: "64px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <img
              src="/event.png"
              alt="About Us"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Stack
            sx={{
              p: "24px",
              background: "rgba(0, 50, 88, 0.08)",
              height: "100%",
              borderRadius: "12px",
            }}
            justifyContent="space-between"
          >
            <Stack gap="16px">
              <Stack gap="8px">
                <Chip chip={"Upcoming Event"} />
                <Typography variant="h4">
                  AOA Seminar—Pelvis & Acetabular Fracture Management
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.secondary">
                Date: 18/05/2024 to 19/05/2024
              </Typography>
            </Stack>
            <Button variant="contained" sx={{ width: "fit-content" }}>
              View Details
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
