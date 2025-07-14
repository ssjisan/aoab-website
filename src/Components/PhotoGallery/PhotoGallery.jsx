import { Box, Container, useMediaQuery } from "@mui/material";
import SectionContent from "../Common/SectionContent";
import ImageCardDeck from "./ImageCardDeck";

export default function PhotoGallery() {
  const forBelow767 = useMediaQuery("(max-width:767px)");

  return (
    <Box sx={{ p: forBelow767 ? "100px 0px 40px 0px" : "210px 0px 64px 0px" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: forBelow767 ? "40px" : "64px",
        }}
      >
        <SectionContent
          chip="Gallery"
          title="Celebrating Moments that Shaped Our Journey."
          subTitle="Glimpses  of different events of AOA Bangladesh. Learning knowledge with attitude."
        />
        <ImageCardDeck />
      </Container>
    </Box>
  );
}
