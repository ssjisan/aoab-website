import { Box } from "@mui/material";
import Form from "../../Components/UserAuth/Login/Form";
import Symbolic from "../../assets/Symbolic";

export default function Login() {
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
    <div>
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
    </div>
  );
}
