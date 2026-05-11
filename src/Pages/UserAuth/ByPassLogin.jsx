import { Box } from "@mui/material";
import Symbolic from "../../assets/Symbolic";
import Form from "../../Components/UserAuth/ByPassLogin/Form";

export default function ByPassLogin() {
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
      <Form />
    </div>
  );
}
