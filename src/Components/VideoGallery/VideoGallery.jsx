import { Box, Container, useMediaQuery } from "@mui/material";
import VideoCardDeck from "./VideoCardDeck";
import SectionContent from "../Common/SectionContent";

export default function VideoGallery() {
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
          chip="Videos"
          title="I hear and I forget, I see and I remember, I do and I understand."
          subTitle="Watch n learn both operative and non operative techniques by looking at videos of this section."
        />
        <VideoCardDeck />
      </Container>
    </Box>
  );
}
