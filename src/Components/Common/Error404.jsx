import { Button, Container, Stack, Typography } from "@mui/material";
import Navbar from "../../Layout/Navbar/Navbar";
import loaderAnimation from "../../assets/404.json"; // Import your animation JSON
import Lottie from "lottie-react";

export default function Error404() {
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          height: "100vh", // Full screen height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // Ensures stacked layout
          textAlign: "center",
        }}
      >
        <Stack alignItems="center">
          <div
            style={{
              height: "280px",
              margin: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Lottie
              animationData={loaderAnimation} // Use imported animation JSON directly
              loop
              style={{ width: 280, height: 280 }} // Adjust dimensions as needed
            />
          </div>
          <Typography variant="h2">Oops, This page not found!</Typography>
          <Typography variant="h6" color="text.secondary">
            or the page may have been removed
          </Typography>
          <Button variant="contained" href="/" sx={{ mt: 2 }}>
            Go Back Home
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
