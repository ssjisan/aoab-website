import { Box } from "@mui/material";
import Logo from "../../assets/Logo";
import Form from "../../Components/UserAuth/OTPVerify/Form";

export default function OTPVerify() {
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
            width: "180px",
          }}
          component="a"
          href="/"
        >
          <Logo colorOne={"#003258"} colorTwo={"#91B512"} />
        </Box>
      </Box>
      <Form />
    </div>
  );
}
