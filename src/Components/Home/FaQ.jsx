import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import SectionContent from "../Common/SectionContent";
import { RightArrow } from "../../assets/Icons";
import { main } from "../../Assets/FaQFake";

export default function FaQ() {
  return (
    <Container sx={{ pt: "64px", pb: "64px" }}>
      <Stack gap="48px">
        <SectionContent
          chip="Frequently asked questions"
          title="Got any questions?"
          subTitle=""
        />
        <Box>
          {main.map((data) => {
            return (
              <Accordion
                key={data.id}
                square={"false"}
                sx={{
                  marginTop: "24px",
                  borderBottom: "1px solid rgba(145, 142, 175, 0.40)",
                  boxShadow: "none",
                  position: "inherit",
                  padding: "4px",
                }}
              >
                <AccordionSummary
                  expandIcon={<RightArrow size="20px" color="#111827" />}
                  aria-controls="panel1-content"
                  id={data.id}
                >
                  <Typography variant="h5">{data.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{data.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
}
