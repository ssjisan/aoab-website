import { Box } from "@mui/material";
import Logo from "../../assets/Logo";
import Form from "../../Components/UserAuth/ResetPassword/Form";
import { useContext } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import Error404 from "../../Components/Common/Error404";

export default function ResetPassword() {
  const NavSx = {
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    zIndex: 1000,
  };
  const { email } = useContext(DataContext);

  // Configure Style End
  return (
    <>
      {email === "" ? (
        <Error404 />
      ) : (
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
      )}
    </>
  );
}
