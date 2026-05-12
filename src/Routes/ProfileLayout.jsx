import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import ProfileNavbar from "../Layout/ProfileNavbar";
import Sidebar from "../Layout/Sidebar";

export default function ProfileLayout() {
  const forBelow1200 = useMediaQuery("(min-width:1200px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <ProfileNavbar handleDrawerToggle={handleDrawerToggle} />
        <Toolbar />

        <Box p={forBelow1200 ? 3 : 2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
