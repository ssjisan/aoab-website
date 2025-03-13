import { Box, Button, Container, Stack, Typography, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Calender } from "../../assets/Icons";

export default function Details() {
  const { id } = useParams();

  const [courseEvent, setCourseEvent] = useState(null);

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/courses_events/${id}`
      );
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
          <Skeleton variant="rectangular" width="100%" height="480px" sx={{ mb: "48px" }} />
          <Skeleton variant="text" width="60%" height={50} sx={{ mt: 2 }} />
          <Stack gap="16px" sx={{ mt: "48px" }} flexDirection="row" justifyContent="space-between">
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
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 4 }} />
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
      <Container>
        <Box sx={{ width: "100%", height: "480px", mb: "48px" }}>
          {courseEvent.coverPhoto && courseEvent.coverPhoto[0] ? (
            <img
              src={courseEvent.coverPhoto[0].url}
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
          <Stack gap="8px" flexDirection="row" alignItems="center">
            <Calender color="#003258" size={24} />
            <Typography variant="h6" color="text.secondary">
              {start} &nbsp; - &nbsp; {end}
            </Typography>
          </Stack>
          <Stack gap="0px" flexDirection="column">
            <Typography variant="body2" color="text.secondary">
              Enrollment Fee
            </Typography>
            <Typography variant="h6" color="text.primary">
              {courseEvent.fees === 0 ? "Free" : courseEvent.fees}
            </Typography>
          </Stack>
          <Button variant="contained" disabled>
            Register
          </Button>
        </Stack>
        <Stack sx={{mt:"24px", mb:"24px"}} gap="16px">
          <Typography variant="h6" color="text.secondary">
          Contact Person: <Box component={"span"} sx={{color:"#000"}}>{courseEvent.contactPerson}</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary">
          Contact Email: <Box component={"span"} sx={{color:"#000"}}>{courseEvent.contactEmail}</Box>
          </Typography>
        </Stack>
        <Typography
          sx={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: courseEvent.details }}
        />
      </Container>
    </Box>
  );
}
