import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CalenderDualTone, Fees } from "../../assets/Icons";

export default function Details() {
  const { id } = useParams();

  const [courseEvent, setCourseEvent] = useState(null);

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    try {
      const { data } = await axios.get(`/courses_events/${id}`);
      setCourseEvent(data);
    } catch (err) {
      toast.error("Error loading blog details", err.message);
    }
  };

  if (!courseEvent) {
    // Skeleton loader when data is not yet available
    return (
      <Box sx={{ pt: "180px" }}>
        <Container>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="480px"
            sx={{ mb: "48px" }}
          />
          <Skeleton variant="text" width="60%" height={50} sx={{ mt: 2 }} />
          <Stack
            gap="16px"
            sx={{ mt: "48px" }}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Stack gap="8px" flexDirection="row" alignItems="center">
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width={150} />
            </Stack>
            <Stack gap="0px" flexDirection="column">
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={80} />
            </Stack>
            <Skeleton variant="rectangular" width={120} height={40} />
          </Stack>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mt: 4 }}
          />
        </Container>
      </Box>
    );
  }

  const start = new Date(courseEvent.startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const end = new Date(courseEvent.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box sx={{ pt: "180px" }}>
      <Container sx={{ mt: "64px", width: "960px", maxWidth: "100%" }}>
        <Box sx={{ width: "100%", height: "480px" }}>
          {/* Check if coverPhoto and coverPhoto[0] exist before rendering */}
          {courseEvent.coverPhoto ? (
            <img
              src={courseEvent.coverPhoto.url}
              alt={courseEvent.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography>No cover photo available</Typography>
          )}
        </Box>
        <Typography variant="h3" sx={{ mt: 2 }}>
          {courseEvent.title}
        </Typography>
        <Stack
          gap="16px"
          sx={{ mt: "48px" }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Stack gap="16px">
            <Stack gap="8px" flexDirection="row">
              <CalenderDualTone color="#003258" size={24} />
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                >
                  Event Date:&nbsp;
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  component="span"
                  fontWeight="600"
                >
                  {start} &nbsp; - &nbsp; {end}
                </Typography>
              </Box>
            </Stack>
            <Stack gap="0px" flexDirection="column">
              <Stack gap="8px" flexDirection="row">
                <Fees color="#003258" size={24} />
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="span"
                  >
                    Enrollment Fee:&nbsp;
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component="span"
                    fontWeight="600"
                  >
                    {courseEvent.fee} taka
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Button variant="contained" href={`/enrollment/${courseEvent._id}`}>
            Register
          </Button>
        </Stack>
        {courseEvent.contactPersons &&
          courseEvent.contactPersons.length > 0 && (
            <Stack direction="row" spacing={2} mt={4} flexWrap="wrap">
              {courseEvent.contactPersons.map((person, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                    padding: "16px",
                    minWidth: "240px",
                    flex: "1 1 auto",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                    Contact Person {index + 1}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      Name:&nbsp;
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      component="span"
                      fontWeight="600"
                    >
                      {person.name}
                    </Typography>
                  </Box>
                  {person.email && (
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        Email:&nbsp;
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component="span"
                        fontWeight="600"
                      >
                        {person.email}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        <Typography
          sx={{ whiteSpace: "pre-wrap" }} // Ensure white space is preserved
          dangerouslySetInnerHTML={{ __html: courseEvent.details }} // Render HTML content safely
        />
      </Container>
    </Box>
  );
}
