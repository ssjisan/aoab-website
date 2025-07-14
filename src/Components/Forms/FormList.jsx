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
          title="Help us to organize yourselves."
          subTitle="You will find all different type of forms for application , registration etc here."
        />
        <Box>
          <View />
        </Box>
      </Container>
    </Box>
  );
}
