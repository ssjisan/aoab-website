import Navbar from "../../Layout/Navbar/Navbar";
import { Container, Grid, Stack, Typography } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
export default function Certificates() {
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
          <Typography sx={{ fontWeight: "700" }}>Certificates</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Once you complete a course, you will be able to view all your
            certificates here.
          </Typography>
        </Stack>
        Certificates
      </Container>
    </div>
  );
}
