import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import SectionContent from "../Common/SectionContent";

export default function Matrix() {
  // Dynamic data for cards
  const cardData = [
    { title: "EDUCATIONAL EVENTS", count: "1,276" },
    { title: "HEALTHCARE WORKERS TRAINED", count: "41,428" },
    { title: "FELLOWSHIPS SPONSORED", count: "541" },
  ];

  return (
    <Container sx={{ pt: "64px", pb: "64px" }}>
      <Stack gap="64px">
        <SectionContent
          chip="Impact"
          title="Important highlights we achieved"
          subTitle=""
        />
        <Grid container spacing={3}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Stack
                sx={{
                  height: "320px",
                  p: "32px 24px",
                  borderRadius: "12px",
                  background: "rgba(0, 50, 88, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
                justifyContent="space-between"
              >
                {/* Background image with opacity */}
                <Box
                  component="img"
                  src="/AO.png"
                  alt="Background"
                  sx={{
                    position: "absolute",
                    top: "130px", // Adjust top for different screen sizes
                    left: "130px",
                    opacity: 0.08,
                    width: "auto",
                    height: "auto",
                  }}
                />

                {/* Content */}
                <Typography variant="h4" sx={{ fontWeight: 300 }}>
                  {card.title}
                </Typography>
                <Typography variant="h1" color="primary">
                {card.count}                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
