import { useState } from "react";
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
import { main } from "../../assets/FaQ";

export default function FaQ() {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panelId) => {
    setExpanded((prev) => (prev === panelId ? null : panelId));
  };

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
                expanded={expanded === data.id} // Control expansion
                onChange={() => handleAccordionChange(data.id)} // Handle clicks
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
                  aria-controls="panel-content"
                  id={`panel-${data.id}`}
                >
                  <Typography variant="h5">{data.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.isArray(data.answer) ? (
                    <ul style={{ paddingLeft: "16px", margin: "0" }}>
                      {data.answer.map((ans, index) => (
                        <li key={index}>
                          <Typography color="text.secondary">{ans}</Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography color="text.secondary">
                      {data.answer}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
}
