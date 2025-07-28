import { Box, Container, Typography } from "@mui/material";

export default function HeroSection() {
  const MainBoxSx = {
    backgroundImage:
      "linear-gradient(rgba(0, 50, 88, 0.5), rgba(0, 50, 88, 0.5)), url('/bg.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
  };
  const ContainerSx = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const ContentSx = {
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    display: "flex",
  };
  return (
    <Box sx={MainBoxSx}>
      <Container sx={ContainerSx}>
        <Box sx={ContentSx}>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            Improve care of the injured in Bangladesh
          </Typography>
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              textAlign: "center",
              color: "#fff",
              fontWeight: "300 !important",
            }}
          >
            Help us to reduce human suffering, disability and poverty as we work
            to improve care of the injured in Bangladesh
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
