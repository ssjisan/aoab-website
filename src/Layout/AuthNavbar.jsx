import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo";

export default function AuthNavbar() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
        borderBottom: "1px solid",
        borderColor: "rgba(0,0,0,0.06)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Box
        component={Link}
        to="/"
        sx={{
          width: "120px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Logo colorOne={"#003258"} colorTwo={"#91B512"} />
      </Box>
    </Box>
  );
}
