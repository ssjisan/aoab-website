import { useState } from "react";
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
import { Menu, Plus, RightArrow } from "../../assets/Icons";
import MenuDrawer from "./MenuDrawer";
import Logo from "../../assets/Logo";

export default function NavMenu({ isScrolled }) {
  const { pathname } = useLocation();
  const forBelow1100 = useMediaQuery("(max-width:1100px)");
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null); // Immediate hover state
  const [delayedHoveredMenu, setDelayedHoveredMenu] = useState(null); // Delayed hover state

  const toggleDrawer = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleMouseEnter = (id) => {
    setHoveredMenu(id);
    setTimeout(() => setDelayedHoveredMenu(id), 300); // 300ms delay for open
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
    setTimeout(() => setDelayedHoveredMenu(null), 300); // 300ms delay for close
  };

  return (
    <>
      <Stack
        sx={NavSx}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <Box>
          <Link to="/" onClick={goToTop}>
            <Box
              sx={{
                width: isScrolled ? "160px" : "180px",
                transition: "width 0.5s ease-in-out, height 0.5s ease-in-out",
              }}
            >
              <Logo
                colorOne={
                  pathname === "/"
                    ? isScrolled
                      ? "#003258"
                      : "#fff"
                    : "#003258"
                }
                colorTwo={
                  pathname === "/"
                    ? isScrolled
                      ? "#91B512"
                      : "#fff"
                    : "#91B512"
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
                <Stack
                  key={data.id}
                  onMouseEnter={() => handleMouseEnter(data.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={goToTop}
                >
                  <Link to={data.link || "#"} style={linkStyle}>
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
                      {hasSubmenu && (
                        <Plus
                          size="16px"
                          color={
                            pathname === "/"
                              ? isScrolled
                                ? pathname === data.link
                                  ? "#003258"
                                  : "#000"
                                : "#FFF"
                              : pathname === data.link
                              ? "#003258"
                              : "#000"
                          }
                        />
                      )}
                    </Stack>
                  </Link>
                  {hasSubmenu && delayedHoveredMenu === data.id && (
                    <Stack
                      gap="32px"
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#fff",
                        p: "24px 64px",
                        zIndex: 10,
                        width: "100%",
                        opacity: delayedHoveredMenu === data.id ? 1 : 0,
                        visibility:
                          delayedHoveredMenu === data.id ? "visible" : "hidden",
                        transition: "opacity 0.3s ease, visibility 0.3s ease",
                      }}
                    >
                      <Typography variant="h4">{data.title}</Typography>
                      <Stack flexDirection="row" gap="24px">
                        {data.submenu.map((submenu, i) => (
                          <Stack
                            key={i}
                            sx={{
                              p: "16px",
                              width: "312px",
                              borderRadius: "12px",
                              border: "1px solid #F2F2F2",
                              textDecoration: "none",
                              transition: "border-color 0.3s ease",
                              "&:hover": {
                                background: "rgba(0, 50, 88, 0.08)",
                              },
                            }}
                            gap="16px"
                            component="a"
                            href={submenu.link}
                            rel="noopener noreferrer"
                          >
                            <Stack
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <Typography color="text.primary">
                                {submenu.title}
                              </Typography>
                              <RightArrow size="16px" />
                            </Stack>
                            <Typography color="text.secondary">
                              {submenu.subtitle}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  )}
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
                    ? "#003258"
                    : "rgba(255, 255, 255, 1)"
                  : "#003258",
              color: pathname === "/" && !isScrolled ? "#003258" : "#fff",
              borderRadius: "8px",
              padding: "8px 16px",
              textTransform: "none",
              "&:hover":
                pathname === "/" && !isScrolled
                  ? { backgroundColor: "#FFF" }
                  : null,
            }}
            component="a"
            href="/login"
            rel="noopener noreferrer"
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
    </>
  );
}

NavMenu.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
};
