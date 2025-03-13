import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { main } from "./NavConfig";
import { useLocation } from "react-router-dom";
import { Close, Plus } from "../../assets/Icons";
import { useState, useEffect } from "react";
import Logo from "../../assets/Logo";
import PropTypes from "prop-types";

export default function MenuDrawer({ toggleDrawer, handleDrawerClose, open }) {
  const [expandedMenu, setExpandedMenu] = useState(null); // Track expanded menu
  const { pathname } = useLocation();

  // Automatically expand submenu if a child matches the current pathname
  useEffect(() => {
    main.forEach((menu) => {
      if (menu.submenu) {
        const matchedSubmenu = menu.submenu.some(
          (submenu) => submenu.link === pathname
        );
        if (matchedSubmenu) {
          setExpandedMenu(menu.id);
        }
      }
    });
  }, [pathname]);

  const toggleSubmenu = (id) => {
    setExpandedMenu((prev) => (prev === id ? null : id)); // Toggle submenu visibility
  };

  const DrawerSx = {
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: "100%",
    },
  };

  const CloseButtonSx = {
    borderRadius: "8px",
    background: "rgba(145, 142, 175, 0.16)",
    p: "4px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      sx={DrawerSx}
    >
      <Stack gap="16px" sx={{ height: "100vh" }}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: "16px" }}
        >
          <Box sx={{ width: "140px" }}>
            <Logo colorOne={"#003258"} colorTwo={"#91B512"} />
          </Box>
          <Box sx={CloseButtonSx} onClick={handleDrawerClose}>
            <Close />
          </Box>
        </Stack>
        <Stack sx={{ height: "80vh", p: "0px 16px", overflowY: "auto" }}>
          {main.map((data) => (
            <Stack key={data.id} sx={{ mb: "8px" }}>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  p: "16px",
                  background:
                    pathname === data.link || // Parent link matches
                    (data.submenu &&
                      data.submenu.some((submenu) => submenu.link === pathname)) // Child link matches
                      ? "rgba(0, 50, 88, 0.16)"
                      : "#FFF",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={() => data.submenu && toggleSubmenu(data.id)}
                component="a"
                href={data.link}
              >
                <Typography
                  sx={{
                    fontSize: "18px !important",
                    fontWeight: 500,
                    color:
                      pathname === data.link || expandedMenu === data.id
                        ? "#003258"
                        : "#111827",
                  }}
                >
                  {data.title}
                </Typography>
                {data.submenu && (
                  <Box sx={{ ml: "auto" }}>
                    <Plus size="16px" color="#000" />
                  </Box>
                )}
              </Stack>
              {data.submenu && expandedMenu === data.id && (
                <Stack
                  sx={{
                    pl: "32px",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: "24px",
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      backgroundColor: "rgba(0, 50, 88, 0.32)",
                    },
                  }}
                >
                  {data.submenu.map((submenu) => (
                    <Stack
                      key={submenu.id}
                      sx={{
                        p: "16px",
                        textDecoration: "none",
                      }}
                      component="a"
                      href={submenu.link}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px !important",
                          fontWeight: pathname === submenu.link ? 700 : 500,
                          color:
                            pathname === submenu.link ? "#003258" : "#111827",
                        }}
                      >
                        {submenu.title}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>
          ))}
        </Stack>
        <Box sx={{ p: "16px" }}>
          <Button variant="contained" fullWidth component={"a"} href="/login">
            Login
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
}
MenuDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired, // Function to toggle the drawer open/close
  handleDrawerClose: PropTypes.func.isRequired, // Function to handle closing the drawer
  open: PropTypes.bool.isRequired, // Boolean to determine if the drawer is open
};
