import Navbar from "../../Layout/Navbar/Navbar";
import { Container, Stack, Typography } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import ChangePassword from "../../Components/StudentProfile/ChangePassword";
export default function Password() {
  return (
    <div>
      <Navbar />
      <Container sx={{ pt: "120px", pb: "120px" }}>
        <Sidebar />
        <Stack
          sx={{
            width: "100%",
            borderBottom: "1px solid rgba(145, 142, 175, 0.24)",
            pb: "8px",
            mt: "40px",
            mb: "40px",
          }}
          gap="4px"
        >
          <Typography sx={{ fontWeight: "700" }}>Chnage Password</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            For security reasons, do not share your password with anyone.
          </Typography>
        </Stack>
        <ChangePassword />
      </Container>
    </div>
  );
}
