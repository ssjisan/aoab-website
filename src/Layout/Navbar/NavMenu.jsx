import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import { main } from "./NavConfig";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, Plus } from "../../assets/Icons";
import MenuDrawer from "./MenuDrawer";
import Logo from "../../assets/Logo";
export default function NavMenu({ isScrolled }) {
  const { pathname } = useLocation();
  const forBelow1100 = useMediaQuery("(max-width:1100px)");

  // Configure Style Start
  const linkStyle = {
    textDecoration: "none",
    color: "#031E21",
  };
  const NavSx = {
    backgroundColor: isScrolled ? "#fff" : "transparent",
    padding: isScrolled ? "8px 24px" : "16px 24px",
    transition: "background-color 0.5s ease-in-out, padding 0.5s ease-in-out",
    borderBottom: isScrolled && "1px solid rgba(145,142,175,0.32)",
    backdropFilter: isScrolled ? "blur(8px)" : "none",
    gap: "16px",
  };

  const MenuButtonSx = {
    borderRadius: "8px",
    padding: "8px 16px",
  };

  // Configure Style End

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      sx={NavSx}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
    >
      <Box>
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Box
            sx={{
              width: isScrolled ? "160px" : "180px",
              transition: "width 0.5s ease-in-out, height 0.5s ease-in-out",
            }}
          >
            <Logo
              colorOne={
                pathname === "/" ? (isScrolled ? "#003258" : "#fff") : "#003258"
              }
              colorTwo={
                pathname === "/" ? (isScrolled ? "#91B512" : "#fff") : "#91B512"
              }
            />
          </Box>
        </Link>
      </Box>
      {forBelow1100 ? (
        <IconButton onClick={toggleDrawer}>
          <Menu
            color={
              pathname === "/" ? (isScrolled ? "#0D0A25" : "#fff") : "#0D0A25"
            }
          />
        </IconButton>
      ) : (
        <Stack gap="16px" flexDirection="row">
          {main.map((data) => {
             const hasSubmenu = data.submenu && data.submenu.length > 0;
            return (
              <Stack key={data.id} onClick={goToTop}>
                <Link to={data.link} style={linkStyle}>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="8px"
                    sx={{
                      ...MenuButtonSx,
                      backgroundColor:
                        pathname === "/" && data.link === pathname
                          ? isScrolled
                            ? "rgba(0, 50, 88, 0.16)"
                            : "rgba(255, 255, 255, 0.16)"
                          : data.link === pathname
                          ? "rgba(0, 50, 88, 0.16)"
                          : "transparent",
                    }}
                  >
                    <Typography
                      sx={{
                        lineHeight: "20px",
                        color:
                          pathname === "/"
                            ? isScrolled
                              ? pathname === data.link
                                ? "#003258"
                                : "#000"
                              : "#FFF"
                            : pathname === data.link
                            ? "#003258"
                            : "#000",
                      }}
                      variant="subtitle2"
                    >
                      {data.title}
                    </Typography>
                    {
                      hasSubmenu && <Plus size="16px" color={
                        pathname === "/"
                          ? isScrolled
                            ? pathname === data.link
                              ? "#003258"
                              : "#000"
                            : "#FFF"
                          : pathname === data.link
                          ? "#003258"
                          : "#000"}/>
                    }
                  </Stack>
                </Link>
              </Stack>
            );
          })}
        </Stack>
      )}
      {!forBelow1100 && (
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              pathname === "/"
                ? isScrolled
                  ? "#003258" // Scrolled state for homepage
                  : "rgba(255, 255, 255, 1)" // Default homepage background
                : "#003258", // Default background for other pages
            color: pathname === "/" && !isScrolled ? "#003258" : "#fff", // Text color
            borderRadius: "8px",
            padding: "8px 16px",
            textTransform: "none",
          }}
        >
          Login
        </Button>
      )}
      <MenuDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        handleDrawerClose={handleDrawerClose}
      />
    </Stack>
  );
}

NavMenu.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
};
