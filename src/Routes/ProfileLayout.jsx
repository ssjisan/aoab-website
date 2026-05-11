import { Outlet } from "react-router-dom";
import ProfileNavbar from "../Layout/ProfileNavbar";
import Sidebar from "../Layout/Sidebar";
import { Box, Toolbar, useMediaQuery } from "@mui/material";

export default function ProfileLayout() {
  const forBelow1200 = useMediaQuery("(min-width:1200px)");

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <ProfileNavbar />
        <Toolbar />
        <Box p={forBelow1200 ? 3 : 2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
