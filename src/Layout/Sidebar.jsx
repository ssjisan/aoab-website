import { Link, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import navConfig from "../Layout/Navbar/ProfileMenu";
import Logo from "../assets/Logo";
import PropTypes from "prop-types";

const drawerWidth = 260;

function Sidebar({ mobileOpen, handleDrawerToggle, window }) {
  const { pathname } = useLocation();

  // Build menu items and remove logout
  const menuItems = navConfig({ pathname }).filter(
    (item) => item.title !== "Log out",
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#F9FAFB",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          pl: 3,
          pt: 3,
          pb: 4,
          display: "flex",
          alignItems: "center",
          width: 160,
        }}
      >
        <Logo colorOne="#003258" colorTwo="#91B512" />
      </Box>

      {/* Navigation */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const menuItem = item.items?.[0];

          if (!menuItem) return null;

          const { link, title } = menuItem;
          const active = pathname === link;

          return (
            <Box
              key={title}
              component={Link}
              to={link}
              onClick={() => {
                // Close drawer on mobile after navigation
                if (mobileOpen) {
                  handleDrawerToggle();
                }
              }}
              sx={{
                mx: 1,
                my: 0.5,
                display: "block",
                textDecoration: "none",
              }}
            >
              <ListItemButton
                selected={active}
                sx={{
                  height: 44,
                  borderRadius: "10px",
                  px: 2,
                  color: active ? "#003258" : "#637381",
                  "&.Mui-selected": {
                    backgroundColor: "#00325818",
                    color: "#003258",
                  },

                  "&.Mui-selected:hover": {
                    backgroundColor: "#00325822",
                  },

                  "&:hover": {
                    backgroundColor: active
                      ? "#00325822" // slightly stronger than active bg
                      : "rgba(0, 50, 88, 0.06)", // soft brand tint for inactive items
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </Typography>
              </ListItemButton>
            </Box>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth },
        flexShrink: { lg: 0 },
      }}
      aria-label="profile navigation"
    >
      <CssBaseline />

      {/* Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#F9FAFB",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#F9FAFB",
            borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
Sidebar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  window: PropTypes.func,
};

Sidebar.defaultProps = {
  window: undefined,
};
