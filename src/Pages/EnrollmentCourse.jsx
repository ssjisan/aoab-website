import { Typography, Button, Container, Stack, TextField } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Layout/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataProcessing/DataProcessing";
import axios from "axios";
import toast from "react-hot-toast";
import EligibilityModal from "./EligibilityModal";

export default function EnrollmentCourse() {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  const { auth } = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [course, setCourse] = useState(null);
  const studentId = auth?.user?._id;
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(null); // null, true, or false

  // ✅ Load course details on mount
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { data } = await axios.get(`/courses_events/${courseId}`);
        setCourse(data);
      } catch (err) {
        toast.error("Failed to load course data", err.message);
      }
    };

    if (courseId) loadCourse();
  }, [courseId]);
  // ✅ Handle enrollment
  const handleEnrollClick = async () => {
    try {
      if (!studentId) {
        toast.error("You must be logged in to enroll");
        return;
      }

      const payload = { studentId, courseId };
      const res = await axios.post("/eligibility-check", payload);

      if (res.data.success) {
        setEnrollmentSuccess(true);
        setModalMessage([
          res.data.message || "You are eligible for this course.",
        ]);
        setModalOpen(true);
      } else {
        setEnrollmentSuccess(false);
        setModalMessage(res.data.reasons || ["Enrollment failed."]);
        setModalOpen(true);
      }
    } catch (err) {
      const reasons = err?.response?.data?.reasons;
      setEnrollmentSuccess(false);
      setModalMessage(
        Array.isArray(reasons) ? reasons : ["Enrollment failed. Try again."]
      );
      setModalOpen(true);
    }
  };

  const handleConfirmEnrollment = async () => {
    const payload = {
      courseId,
      courseTitle: course?.title,
      categoryId:
        typeof course?.category === "object"
          ? course?.category?._id
          : course?.category,
      studentId,
    };

    try {
      const res = await axios.post("/enrollment", payload);

      if (res.status === 201) {
        const status = res.data?.data?.status;

        toast.success(
          status === "waitlist"
            ? "You have been waitlisted successfully."
            : "Enrollment successful!"
        );

        navigate("/enrollment-history");
      }
    } catch (error) {
      const backendMessage = error?.response?.data?.error;
      toast.error(backendMessage || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Stack
          sx={{ pt: "120px", px: 3, pb: "80px" }}
          alignItems="center"
          gap="64px"
        >
          <Stack
            sx={{
              width: {
                xs: "100%", // extra-small and small screens
                sm: "100%", // small screens (optional, same as xs)
                md: "60%", // medium and larger screens
                lg: "40%",
              },
            }}
            gap="16px"
          >
            <Typography variant="h4" sx={{ mb: 3 }}>
              Course Enrollment
            </Typography>

            <Stack gap="8px">
              <Typography variant="body1" fontWeight={600}>
                Course name
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={course?.title || ""}
                disabled
              />
            </Stack>

            <Stack gap="8px">
              <Typography variant="body1" fontWeight={600}>
                Location
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={course?.location || ""}
                disabled
              />
            </Stack>

            <Stack gap="8px">
              <Typography variant="body1" fontWeight={600}>
                Fees
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={course?.fee ? `${course.fee} taka` : ""}
                disabled
              />
            </Stack>

            <Stack gap="8px">
              <Typography variant="body1" fontWeight={600}>
                Start Date
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={
                  course?.startDate
                    ? new Date(course.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""
                }
                disabled
              />
            </Stack>

            <Stack
              gap="16px"
              direction={{ xs: "column", sm: "column", md: "row" }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleEnrollClick}
                sx={{ flex: 1 }}
              >
                Enroll
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <EligibilityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        messages={modalMessage}
        success={enrollmentSuccess}
        title={course?.title}
        onConfirm={handleConfirmEnrollment}
      />
      <Footer />
    </>
  );
}
