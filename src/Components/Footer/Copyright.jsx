import { Container, Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>© AO ALLIANCE - Bangladesh</Typography>
      <Typography>
        Powered by{" "}
        <a
          href="https://www.insighttechbd.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "underline",
            color: "inherit", // Keeps the text color consistent with Typography
          }}
        >
          Insighttech bd
        </a>
      </Typography>
    </Container>
  );
}
