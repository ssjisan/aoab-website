import { Container, Grid, Stack, Typography } from "@mui/material";

export default function NavigatorPart() {
  return (
    <Container>
      <Grid container spacing={4}>
        {/* <Grid item xs={12} sm={12} md={5} lg={5}>
          <Typography
            variant="body1"
            sx={{ lineHeight: "200% !important", fontWeight: 400 }}
          >
            Perferendis repellat veritatis dolores dolorum. Exercitationem earum
            ut recusandae iusto. Ipsa velit veritatis blanditiis consequatur
            voluptatibus porro expedita non. Reprehenderit molestias in delectus
            consequatur aut velit.
          </Typography>
        </Grid> */}
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <Stack gap="16px">
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              Quick Links
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 400 }}
              component="a"
              href="/"
            >
              Home
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 400 }}
              component="a"
              href="/about-us"
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 400 }}
              component="a"
              href="/videos"
            >
              Videos
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <Stack gap="16px">
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              Important
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 400 }}
              component="a"
              href="/educations&training/aoa-bangladesh"
              target="_blank"
            >
              AO Alliance - Bangladesh
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 400 }}
              component="a"
              href="/links&forms/links"
              target="_blank"
            >
              Important Links
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 400 }}
              component="a"
              href="/links&forms/forms"
              target="_blank"
            >
              Important Forms
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Stack gap="16px">
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              Contact
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              LABAID Specialized Hospital , House -1 and, 6, Road No. 4, Dhaka
              1205
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              aoalliancebd@gmail.com
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
