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
          title="Driving knowledge development and transfer in trauma and orthopedic care."
          subTitle="The AO Alliance is a non profit dedicated to improving fracture care in over 30 LMICs across Sub-Saharan Africa and Asia, reducing suffering, disability, and poverty through sustainable programs."
        />
        <ImageCardDeck />
      </Container>
    </Box>
  );
}
