import { useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import SectionContent from "../Common/SectionContent";
import View from "./View";

export default function ListOfLinks() {
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
          chip="Important Links"
          title="Driving knowledge development and transfer in trauma and orthopedic care."
          subTitle="You will find details of past events here in this section of AOA Bangladesh."
        />
        <Box>
          <View />
        </Box>
      </Container>
    </Box>
  );
}
