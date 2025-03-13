import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import ContactDetails from "./ContactDetails";
import OtherLinks from "./OtherLinks";
import RequestProject from "./RequestProject";
import { Logo } from "../../assets/Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  const forBelow767 = useMediaQuery("(max-width:767px)");

  const forBelow599 = useMediaQuery("(max-width:599px)");

  const FooterContainerSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };
  const BottomSx = {
    display: "flex",
    paddingTop: "40px",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: forBelow599 && "column",
    gap: "24px",
  };
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={FooterContainerSx}>
      <Container
        sx={{
          pt: forBelow767 ? "40px" : "80px",
          pb: "32px",
          borderTop: "1px solid  rgba(145,158,171,0.32)",
        }}
      >
        <Box sx={{ p: "24px 0px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <Box sx={{ width: "100%", maxWidth: "320px" }}>
                <Logo colorOne="#114285" colorTwo="#151313" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <ContactDetails />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <OtherLinks />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <RequestProject />
            </Grid>
          </Grid>
        </Box>
        <Box sx={BottomSx}>
          <Typography variant="body1" color="text.secondary">
            POSB © {currentYear}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Powered By{" "}
            <Box component="span" sx={{ textDecoration: "underline" }}>
              <Link to="https://insighttechbd.com/" target="_blank" style={{textDecoration:"none", color:"inherit"}}>Insighttech Bangladesh</Link>
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
