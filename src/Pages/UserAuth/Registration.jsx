import { Box } from "@mui/material";
import Form from "../../Components/UserAuth/Registration/Form";
import Symbolic from "../../assets/Symbolic";

export default function Registration() {
  const NavSx = {
    padding: "8px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    zIndex: 1000,
  };
  // Configure Style End
  return (
    <Box>
      <Box sx={NavSx}>
        <Box
          sx={{
            width: "56px",
          }}
          component="a"
          href="/"
        >
          <Symbolic colorTwo={"#003258"} colorOne={"#91B512"} />
        </Box>
      </Box>
      <Form />
    </Box>
  );
}
