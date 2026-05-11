import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { DataContext } from "../../DataProcessing/DataProcessing";
import { Logout } from "../../assets/Icons";

export default function ProfileMenuPopover() {
  const { auth, setAuth } = useContext(DataContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { data } = await axios.get("/my-profile-data");
        setProfile(data);
      } catch (err) {
        toast.error(
          "Error loading profile: " +
            (err.response?.data?.message || err.message),
        );
      }
    };

    loadProfileData();
  }, []);

  // Open popover
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout
  const handleLogout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("auth");
    handleClose();
    navigate("/");
  };

  // Styles
  const menuSx = {
    mt: "12px",
    "& .MuiPaper-root": {
      overflow: "visible",
      width: 280,
      borderRadius: "12px",
      border: "1px solid #E5E7EB",
      boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
      padding: "8px",
    },
  };

  const avatarSx = {
    width: "100%",
    height: "100%",
    fontSize: "18px",
    color: "#FFF",
    bgcolor: "#000",
    transition: "transform 0.3s ease",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  return (
    <>
      {/* Avatar Trigger */}
      <IconButton
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: 40,
          height: 40,
          p: "2px !important",
          borderRadius: "50%",
          border: "1px solid #DFDFDF",
          overflow: "hidden",
        }}
      >
        <Avatar src={profile?.picture?.url || ""} alt="Profile" sx={avatarSx}>
          {profile?.name
            ? profile.name.charAt(0).toUpperCase()
            : auth?.user?.name?.charAt(0).toUpperCase() || "G"}
        </Avatar>
      </IconButton>

      {/* Popover Menu */}
      <Menu
        id="profile-menu"
        sx={menuSx}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* User Info */}
        <Box
          sx={{
            px: 1,
            py: 1.5,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            {auth?.user?.name || "Guest User"}
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 400,
              color: "#6B7280",
              wordBreak: "break-word",
            }}
          >
            {auth?.user?.email || "No email available"}
          </Typography>
        </Box>

        <Divider
          variant="middle"
          sx={{
            borderStyle: "dashed",
            my: 1,
          }}
        />

        {/* My Profile */}
        <MenuItem
          component={Link}
          to="/profile"
          onClick={handleClose}
          sx={{
            borderRadius: "8px",
            py: 1.25,
            px: 1.5,
            gap: 1.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              color: "#637381",
            }}
          >
            {/* <PersonOutlineIcon fontSize="small" /> */}
          </ListItemIcon>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#111827",
            }}
          >
            My Profile
          </Typography>
        </MenuItem>

        {/* Logout */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            borderRadius: "8px",
            py: 1.25,
            px: 1.5,
            gap: 1.5,
            mt: 0.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              color: "#FF4842",
            }}
          >
            <Logout size="18px" color="#FF4842" />
          </ListItemIcon>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#FF4842",
            }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
