import { Box, Container, useMediaQuery } from "@mui/material";
import SectionContent from "../Common/SectionContent";
import View from "./View";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { useContext } from "react";

export default function EducationTrainingView() {
  const forBelow767 = useMediaQuery("(max-width:767px)");
  const { monthlyEvents } = useContext(DataContext);

  return (
    <Box
      sx={{
        p:
          !monthlyEvents || monthlyEvents.length === 0
            ? "180px 0px 64px 0px"
            : "64px 0px 64px 0px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: forBelow767 ? "40px" : "64px",
        }}
      >
        <SectionContent
          chip="Upcoming events"
          title="Join our forces to give better service to our people by enriching yourself."
          subTitle="The AO Alliance is a nonprofit dedicated to improving fracture care in over 30 LMICs across Sub-Saharan Africa and Asia, reducing suffering, disability, and poverty through sustainable programs."
        />
        <Box>
          <View />
        </Box>
      </Container>
    </Box>
  );
}
