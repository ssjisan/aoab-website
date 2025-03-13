import { Box, Container } from "@mui/material";
import Logo from "../../assets/Logo";

export default function LogoPart() {
  return (
    <Container>
      <Box sx={{ pt: "16px", pb: "16px", width:"210px" }}>
        <Logo
          colorOne="#003258"
          colorTwo="#91B512"
        />
      </Box>
    </Container>
  );
}
