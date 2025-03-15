import {
  Box,
  Typography,
  List,
  ListItemButton,
  Drawer,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import navConfig from "../Navbar/ProfileMenu";
import { DataContext } from "../../DataProcessing/DataProcessing";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfileMenuDrawer() {
  const { auth, setAuth } = useContext(DataContext); // Use the auth context
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [profile, setProfile] = useState(null); // Set initial state to null to avoid .map on an empty array

  useEffect(() => {
    // Function to load the profile data
    const loadProfileData = async () => {
      try {
        const { data } = await axios.get("/my-profile-data");
        setProfile(data); // Assuming data is an object, not an array
      } catch (err) {
        toast.error("Error loading profile:", err);
      }
    };

    // Call the function to load profile data
    loadProfileData();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    setAuth({ token: null, user: null }); // Clear auth state
    localStorage.removeItem("auth"); // Remove stored token
    navigate("/");
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* User Profile Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "16px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Box
          sx={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            overflow: "hidden",
            mb: "8px",
          }}
        >
          <Avatar
            src={profile?.picture?.[0]?.url || ""} // Assuming the profile picture is the first image in the array
            alt="Profile"
            sx={{
              width: "100%",
              height: "100%",
              fontSize: "32px",
              color: "#FFF",
              bgcolor: "#000",
            }}
          >
            {profile?.name ? profile.name.charAt(0).toUpperCase() : "G"}{" "}
          </Avatar>
        </Box>
        <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
          {auth?.user?.name}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#6B7280" }}>
          {auth?.user?.email}
        </Typography>
      </Box>

      {/* Navigation List */}
      <List sx={{ p: "8px" }}>
        {navConfig({ pathname }).map((data) => {
          const isLogout = data.title === "Log out";

          return (
            <ListItemButton
              component={Link}
              to={!isLogout ? data.items[0].link : "#"}
              key={data.items[0].title}
              onClick={isLogout ? handleLogout : undefined}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                borderRadius: "8px",
                width: "100%",
                padding: "8px 16px",
                height: "44px",
                mb: "4px",
                background: isLogout
                  ? "#FFEBEE"
                  : pathname === data.items[0].link
                  ? "#FCECFF"
                  : "transparent",
                color: isLogout
                  ? "#D32F2F"
                  : pathname === data.items[0].link
                  ? "#9C27B0"
                  : "#637381",
              }}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>{data.icon}</ListItemIcon>
              <Typography
                sx={{
                  fontWeight: pathname === data.items[0].link ? 600 : 500,
                  fontSize: "14px !important",
                }}
              >
                {data.items[0].title}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <Box
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "4px",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={toggleDrawer(true)}
      >
        <Avatar
          src={profile?.picture?.[0]?.url || ""} // Assuming the profile picture is the first image in the array
          alt="Profile"
          sx={{
            width: "40px",
            height: "40px",
            fontSize: "32px",
            color: "#FFF",
            bgcolor: "#000",
          }}
        >
          {profile?.name ? profile.name.charAt(0).toUpperCase() : "G"}{" "}
        </Avatar>
      </Box>

      <Drawer
        open={open}
        BackdropProps={{ sx: { backgroundColor: "transparent" } }}
        onClose={toggleDrawer(false)}
        anchor={"right"}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
