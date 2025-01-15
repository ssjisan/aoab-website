import { useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import SectionContent from "../Common/SectionContent";
import View from "./View";

export default function FormList() {
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
          chip="Important Forms"
          title="Driving knowledge development and transfer in trauma and orthopedic care."
          subTitle="The AO Alliance is a nonprofit dedicated to improving fracture care in over 30 LMICs across Sub-Saharan Africa and Asia, reducing suffering, disability, and poverty through sustainable programs."
        />
        <Box>
          <View />
        </Box>
      </Container>
    </Box>
  );
}
