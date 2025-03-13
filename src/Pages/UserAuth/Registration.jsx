import { Box } from "@mui/material";
import Logo from "../../assets/Logo";
import Form from "../../Components/UserAuth/Registration/Form";

export default function Registration() {
  const NavSx = {
    padding: "16px 24px",
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
            width: "120px",
          }}
          component="a"
          href="/"
        >
          <Logo colorOne={"#003258"} colorTwo={"#91B512"} />
        </Box>
      </Box>
      <Form/>
    </div>
  );
}
