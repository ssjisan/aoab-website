import { Container, Grid, Stack, Typography } from "@mui/material";

export default function NavigatorPart() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Typography
            variant="body1"
            sx={{ lineHeight: "200% !important", fontWeight: 300 }}
          >
            Perferendis repellat veritatis dolores dolorum. Exercitationem earum
            ut recusandae iusto. Ipsa velit veritatis blanditiis consequatur
            voluptatibus porro expedita non. Reprehenderit molestias in delectus
            consequatur aut velit.
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2}>
          <Stack gap="16px">
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              Quick Links
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              Home
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              About Us
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              Videos
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              Contact
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2}>
          <Stack gap="16px">
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              Education
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              Educations & Training
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              Clinical Research
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              Online learning
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Stack gap="16px">
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              Contact
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              LABAID Specialized Hospital , House -1 and, 6, Road No. 4, Dhaka
              1205
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
              aoalliancebd@gmail.com
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
