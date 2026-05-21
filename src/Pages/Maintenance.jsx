import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function Maintenance() {
  return (
    <Box
      sx={{
        pt: "120px",
        pb: "60px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 5,
            p: { xs: 3, md: 5 },
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Main Emoji */}
          <Box
            sx={{
              width: 110,
              height: 110,
              mx: "auto",
              mb: 4,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff7ed",
              border: "1px solid #fed7aa",
              fontSize: "3.5rem",
            }}
          >
            🛠️
          </Box>

          {/* Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "#0f172a",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Under Maintenance
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              maxWidth: 650,
              mx: "auto",
              mb: 5,
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            We’re currently improving our platform to provide a better
            experience for you. Please check back again shortly.
          </Typography>

          {/* Info Section */}
          <Grid container spacing={3} mb={5}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 4,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    <Typography fontSize="2.5rem">⏳</Typography>

                    <Typography variant="h6" fontWeight="bold" color="#0f172a">
                      Estimated Time
                    </Typography>

                    <Typography variant="body2" color="#64748b">
                      Expected to be back online within a few days.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 4,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    <Typography fontSize="2.5rem">⚡</Typography>

                    <Typography variant="h6" fontWeight="bold" color="#0f172a">
                      System Upgrade
                    </Typography>

                    <Typography variant="body2" color="#64748b">
                      Improving performance, stability, and security.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Button */}
          <Button
            variant="contained"
            size="large"
            onClick={() => window.location.reload()}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              backgroundColor: "#f97316",
              boxShadow: "0 10px 25px rgba(249,115,22,0.2)",
              "&:hover": {
                backgroundColor: "#ea580c",
              },
            }}
          >
            🔄 Refresh Page
          </Button>

          {/* Footer */}
          <Typography
            variant="body2"
            sx={{
              mt: 5,
              color: "#94a3b8",
            }}
          >
            © 2026 Your Company. All rights reserved.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
