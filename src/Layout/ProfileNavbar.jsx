import { AppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileMenuPopover from "./Navbar/ProfileMenuDrawer";
import { Menu, VisitArrow } from "../assets/Icons";
import PropTypes from "prop-types";

const drawerWidth = 260;

export default function ProfileNavbar({ handleDrawerToggle }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        ml: { lg: `${drawerWidth}px` },
        bgcolor: "rgba(249, 250, 251, 0.8)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px dashed rgba(145, 158, 171, 0.24)",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: {
            xs: "space-between",
            lg: "flex-end",
          },
        }}
      >
        <IconButton
          color="default"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { lg: "none" },
          }}
        >
          <Menu color="#031E21" size={24} />
        </IconButton>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            component={Link}
            to="/"
            variant="outlined"
            size="medium"
            startIcon={<VisitArrow size={20} color={"#003258"} />}
          >
            Visit Website
          </Button>

          <ProfileMenuPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
ProfileNavbar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};
