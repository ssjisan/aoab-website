import { Box, Typography, Button, Container } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Layout/Navbar/Navbar";
import { useContext } from "react";
import { DataContext } from "../DataProcessing/DataProcessing";
import { useLocation, useNavigate } from "react-router-dom";

export default function EnrollmentCourse() {
  const { auth } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract eligibility data from route state
  const eligibility = location.state?.eligibility;

  // Redirect back if no eligibility data found (optional)
  if (!eligibility) {
    navigate("/"); // or wherever appropriate
    return null;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ pt: "120px", px: 3 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Enrollment Report
          </Typography>

          <Typography
            variant="h6"
            color={eligibility.success ? "green" : "error"}
            sx={{ mb: 2 }}
          >
            {eligibility.message}
          </Typography>

          {/* Optional: show some course info */}
          {eligibility.courseEvent && (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Course Title: {eligibility.courseEvent.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 4 }}>
                Enrollment Fee: {eligibility.courseEvent.fee} taka
              </Typography>
            </>
          )}

          {/* Optional: Back to courses or other navigation */}
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
