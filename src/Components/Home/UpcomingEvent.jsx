import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import Chip from "../Common/Chip";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import {  Mail } from "../../assets/Icons";

export default function UpcomingEvent() {
  const { pathname } = useLocation();
  const forBelow767 = useMediaQuery("(max-width:767px)");
  const { monthlyEvents } = useContext(DataContext);

  const handlePreview = (id) => {
    // Open the URL in a new tab and scroll to the top
    const newTab = window.open(`/course_event/${id}`, "_blank");
    if (newTab) {
      newTab.scrollTo(0, 0); // Ensure the new tab scrolls to the top
    }
  };

  return (
    <Container
      sx={{
        p:
          pathname === "/educations&training/aoa-bangladesh"
            ? forBelow767
              ? "100px 0px 40px 0px"
              : "210px 0px 64px 0px"
            : forBelow767
            ? "40px 0px"
            : "64px 0px",
      }}
    >
      {monthlyEvents && monthlyEvents.length > 0 ? (
        monthlyEvents.map((data) => {
          const start = new Date(data.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const end = new Date(data.endDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <Grid
              container
              spacing={3}
              key={data._id}
              sx={{ alignItems: "stretch" }} // Ensures both columns have equal height
            >
              <Grid item xs={12} sm={12} md={5} lg={5} sx={{ display: "flex" }}>
                <Box
                  sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={data?.coverPhoto?.url}
                    alt="About Us"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7} sx={{ display: "flex" }}>
                <Stack
                  sx={{
                    p: "24px",
                    background: "rgba(0, 50, 88, 0.08)",
                    borderRadius: "12px",
                    width: "100%",
                    height: "100%", // Ensures it matches the image height
                  }}
                  justifyContent="space-between"
                  gap="24px"
                  alignItems="flex-end"
                >
                  <Stack gap="16px" sx={{ width: "100%" }}>
                    <Stack gap="8px">
                      <Chip chip={"Next Event"} />
                      <Typography variant="h4">{data.title}</Typography>
                    </Stack>
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
                    {data.contactPersons && data.contactPersons.length > 0 && (
                      <Stack
                        direction="column"
                        spacing={2}
                        mt={4}
                        flexWrap="wrap"
                      >
                        <Typography variant="h6" fontWeight={700}>
                          Contact Person
                        </Typography>

                        {data.contactPersons.map((person, index) => (
                          <Stack
                            flexDirection="row"
                            gap="8px"
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
                            <Mail size="24px" color="black" />
                            <Stack>
                              <Typography
                                variant="body1"
                                color="text.primary"
                                component="span"
                                fontWeight="600"
                              >
                                {person.name}
                              </Typography>
                              {person.email && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  component="span"
                                  fontWeight="600"
                                >
                                  {person.email}
                                </Typography>
                              )}
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                  <Button
                    variant="contained"
                    sx={{ width: "fit-content" }}
                    onClick={() => handlePreview(data._id)}
                  >
                    View Details
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          );
        })
      ) : (
        // If monthlyEvents is loading or empty, show the skeleton
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          <Grid item xs={12} sm={12} md={5} lg={5} sx={{ display: "flex" }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: "12px", flexGrow: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} sx={{ display: "flex" }}>
            <Stack
              sx={{
                p: "24px",
                background: "rgba(0, 50, 88, 0.08)",
                borderRadius: "12px",
                width: "100%",
                height: "100%",
              }}
              justifyContent="space-between"
            >
              <Stack gap="16px">
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="text" width="60%" height={30} />
              </Stack>
              <Skeleton width="100px" />
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
