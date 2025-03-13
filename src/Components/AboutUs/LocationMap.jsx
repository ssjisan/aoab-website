import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import Chip from "../Common/Chip";

export default function LocationMap() {
  const forBelow676 = useMediaQuery("(max-width:676px)");
  return (
    <Container
      sx={{
        p: "48px",
        mb: "64px",
        borderRadius: "12px",
        background: "rgba(0, 50, 88, 0.08)",
      }}
    >
      <Stack
        gap="16px"
        justifyContent="space-between"
        sx={{ height: "100%", mb: "48px" }}
      >
        <Stack gap="24px">
          <Chip chip={"Location"} />
        </Stack>
        <Typography variant="h2" color="text.primary">
          Where to find us
        </Typography>
        <Typography variant="h5" color="text.primary">
          LABAID Specialized Hospital , House -1 and, 6, Road No. 4, Dhaka 1205
        </Typography>
      </Stack>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1466955352566!2d90.38041907589691!3d23.742147689092008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a02be491%3A0x45a9f97c4d06d4f9!2sLABAID%20Specialized%20Hospital!5e0!3m2!1sen!2sbd!4v1736177727363!5m2!1sen!2sbd"
        width="100%"
        height={forBelow676 ? "360" : "450"}
        style={{ border: 0, borderRadius: "20px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Container>
  );
}
