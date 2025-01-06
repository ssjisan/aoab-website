import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import { main } from "./NavConfig";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { Menu as MenuIcon } from "../../assets/Icons";
import MenuDrawer from "./MenuDrawer";
import Logo from "../../assets/Logo";

export default function NavMenu({ isScrolled }) {
  const { pathname } = useLocation();
  const forBelow1100 = useMediaQuery("(max-width:1100px)");

  // Dropdown Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(anchorEl);

  // Use ref to track submenu item
  const submenuRef = useRef(null);

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  // Configure Styles
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
          <MenuIcon
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
                onClick={goToTop}
                onMouseEnter={hasSubmenu ? handleDropdownOpen : null}
                onMouseLeave={hasSubmenu ? handleDropdownClose : null}
              >
                {!hasSubmenu ? (
                  <Link to={data.link} style={linkStyle}>
                    <Stack
                      flexDirection="row"
                      gap="16px"
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
                    </Stack>
                  </Link>
                ) : (
                  <Button
                    sx={{
                      ...MenuButtonSx,
                      backgroundColor: "transparent",
                      color: "#031E21",
                    }}
                  >
                    {data.title}
                  </Button>
                )}
                {hasSubmenu && (
                  <Box
                    ref={submenuRef}
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                    sx={{ position: "relative", width:"100%" }}
                  >
                    <Menu
                      anchorEl={anchorEl}
                      open={isDropdownOpen}
                      onClose={handleDropdownClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {data.submenu.map((submenuItem) => (
                        <MenuItem
                          key={submenuItem.id}
                          onClick={handleDropdownClose}
                        >
                          <Link to={submenuItem.link} style={linkStyle}>
                            {submenuItem.title}
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
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
