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

export default function UpcomingEvent() {
  const { pathname } = useLocation();
  const forBelow767 = useMediaQuery("(max-width:767px)");
  const { monthlyEvents } = useContext(DataContext);

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
            <Grid container spacing={3} key={data._id}>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Box
                  sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <img
                    src={data.coverPhoto[0].url}
                    alt="About Us"
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <Stack
                  sx={{
                    p: "24px",
                    background: "rgba(0, 50, 88, 0.08)",
                    height: "280px",
                    borderRadius: "12px",
                  }}
                  justifyContent="space-between"
                >
                  <Stack gap="16px">
                    <Stack gap="8px">
                      <Chip chip={"Next Event"} />
                      <Typography variant="h4">{data.title}</Typography>
                    </Stack>
                    <Typography variant="h6" color="text.secondary">
                      Date: {start} to {end}
                    </Typography>
                  </Stack>
                  <Button variant="contained" sx={{ width: "fit-content" }}>
                    View Details
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          );
        })
      ) : (
        // If monthlyEvents is loading or empty, show the skeleton
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Skeleton variant="rectangular" width="100%" height="280px" />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Stack
              sx={{
                p: "24px",
                background: "rgba(0, 50, 88, 0.08)",
                height: "280px",
                borderRadius: "12px",
              }}
              justifyContent="space-between"
            >
              <Stack gap="16px">
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="text" width="60%" height={30} />
              </Stack>
              <Button variant="contained" sx={{ width: "fit-content" }}>
                <Skeleton width="100px" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
