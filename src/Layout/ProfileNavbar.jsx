import {
  AppBar,
  Button,
  Icon,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import ProfileMenuPopover from "./Navbar/ProfileMenuDrawer";
import { Link } from "react-router-dom";
import { Menu } from "../assets/Icons";

const drawerWidth = 260;
export default function ProfileNavbar({ handleDrawerToggle }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        ml: { lg: `${drawerWidth}px` },
      }}
      style={{
        backgroundColor: "rgba(249, 250, 251, 0.8)",
        boxShadow: "none",
        backdropFilter: "blur(6px)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: {
            xs: "space-between",
            sm: "space-between",
            md: "space-between",
            lg: "flex-end",
          },
        }}
      >
        <IconButton
          color="default"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { lg: "none" } }}
        >
          <Menu color="#031E21" size={24} />
        </IconButton>
        <Stack
          direction="row"
          justifyContent="center"
          gap="16px"
          alignItems={"center"}
        >
          <Button component={Link} to="/" variant="outlined" size="small">
            Visit Website
          </Button>
          <ProfileMenuPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
