import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import navConfig from "../Layout/Navbar/ProfileMenu";
import Logo from "../assets/Logo";

const drawerWidth = 260;

function Sidebar(props) {
  const { window } = props;
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState([]);

  // Build menu items from navConfig function
  const menuItems = navConfig({ pathname }).filter(
    (item) => item.title !== "Log out",
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleClick = (index) => {
    setOpen((prev) => {
      const newOpen = [...prev];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  // Auto-open active item (kept for future extensibility)
  useEffect(() => {
    const index = menuItems.findIndex(
      (item) => item.items?.[0]?.link === pathname,
    );

    if (index !== -1) {
      setOpen((prev) => {
        const newOpen = [...prev];
        newOpen[index] = true;
        return newOpen;
      });
    }
  }, [pathname]);

  const linkStyle = {
    margin: "0.5rem 1rem",
    textDecoration: "none",
    display: "block",
    borderRadius: "10px",
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "#F9FAFB",
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
          width: "160px",
        }}
      >
        <Logo colorOne={"#003258"} colorTwo={"#91B512"} />{" "}
      </Box>

      {/* Navigation */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item, index) => {
          const link = item.items?.[0]?.link;
          const title = item.items?.[0]?.title;
          const active = pathname === link;

          return (
            <Link to={link} style={linkStyle} key={title}>
              <ListItem
                disablePadding
                onClick={() => handleClick(index)}
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                  height: "44px",
                  background: active ? "rgba(239, 229, 255, 1)" : "transparent",
                }}
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    borderRadius: "10px",
                    width: "100%",
                    px: 2,
                    py: 1,
                    height: "44px",
                    color: active ? "#792DF8" : "#637381",

                    "&:hover": {
                      background: active
                        ? "rgba(239, 229, 255, 1)"
                        : "rgba(145, 158, 171, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <Typography
                    sx={{
                      fontWeight: active ? 600 : 500,
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {title}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
        aria-label="profile navigation"
      >
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
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F9FAFB",
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
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F9FAFB",
              borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Sidebar;
