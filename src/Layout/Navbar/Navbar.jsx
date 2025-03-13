import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";
import { Menu, Plus, RightArrow } from "../../assets/Icons";
import Logo from "../../assets/Logo";
import { main } from "./NavConfig";
import { DataContext } from "../../DataProcessing/DataProcessing";
import ProfileMenuDrawer from "./ProfileMenuDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [touchedItem, setTouchedItem] = useState(null);
  const forBelow1100 = useMediaQuery("(max-width:1100px)");
  const forBelow767 = useMediaQuery("(max-width:767px)");
  const [open, setOpen] = useState(false);
  const { auth, setAuth } = useContext(DataContext); // Auth context
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 200; // Change to your desired threshold value

      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  const handleTouchItem = (itemId) => {
    setTouchedItem((prev) => (prev === itemId ? null : itemId));
  };

  const toggleDrawer = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Configure Style Start
  const NavSx = {
    position: "fixed",
    width: "100%",
    zIndex: 1000,
  };
  // Configure Style End

  return (
    <Box sx={NavSx}>
      <Stack
        sx={{
          p: forBelow1100 ? "16px" : "0px 16px 0px 16px",
          backgroundColor: isScrolled ? "#fff" : "transparent",
          transition: "all 0.5s ease-in-out",
          borderBottom: isScrolled && "1px solid rgba(145,142,175,0.32)",
        }}
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Box
          sx={{
            width: forBelow767 ? "120px" : isScrolled ? "140px" : "180px",
            transition: "all 0.3s ease-in-out",
          }}
          component="a"
          href="/"
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
        {forBelow1100 ? (
          <IconButton
            onClick={toggleDrawer}
            sx={{
              borderRadius: "8px",
              background: "rgba(145, 142, 175, 0.16)",
            }}
          >
            <Menu
              color={
                pathname === "/" ? (isScrolled ? "#0D0A25" : "#fff") : "#0D0A25"
              }
            />
          </IconButton>
        ) : (
          <Stack
            flexDirection="row"
            sx={{
              height: isScrolled ? "72px" : "96px",
              transition: "all 0.3s ease-in-out",
            }}
            gap="8px"
            alignItems="center"
          >
            {main.map((data) => {
              const hasSubmenu = data.submenu && data.submenu.length > 0;
              const isSubmenuActive =
                hasSubmenu &&
                data.submenu.some((submenu) => submenu.link === pathname);
              const isActive = data.link === pathname || isSubmenuActive;

              return (
                <Stack
                  key={data.id}
                  sx={{ height: "100%", textDecoration: "none" }}
                  component="a"
                  href={hasSubmenu ? null : data.link}
                  onMouseEnter={() => setHoveredItem(data.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => hasSubmenu && handleTouchItem(data.id)} // Toggle submenu on touch/click
                  justifyContent="center"
                >
                  <Stack
                    sx={{
                      p: "8px 16px",
                      backgroundColor: isActive
                        ? pathname === "/"
                          ? isScrolled
                            ? "rgba(0, 50, 88, 0.16)"
                            : "rgba(255, 255, 255, 0.16)"
                          : "rgba(0, 50, 88, 0.16)"
                        : "transparent",
                      height: "fit-content",
                      textDecoration: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    flexDirection="row"
                    alignItems="center"
                    gap="8px"
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
                        textDecoration: "none",
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
                  {hasSubmenu &&
                    (hoveredItem === data.id || touchedItem === data.id) && (
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
                          borderTop: "1px solid #F2F2F2",
                          boxShadow:
                            "0 0 2px 0 rgba(145 158 171 / 0.24), -20px 20px 40px -4px rgba(145 158 171 / 0.24);",
                          transition: "all 0.3s ease",
                          background: "#FFF",
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
                                background: "#003258",
                                "&:hover": {
                                  border: "1px solid #fff",
                                },
                              }}
                              gap="16px"
                              component="a"
                              href={submenu.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Stack
                                flexDirection="row"
                                justifyContent="space-between"
                              >
                                <Typography sx={{ color: "#fff" }}>
                                  {submenu.title}
                                </Typography>
                                <RightArrow size="16px" color="#FFF" />
                              </Stack>
                              <Typography sx={{ color: "#fff" }}>
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
        {!forBelow1100 &&
          (auth?.token ? (
            <ProfileMenuDrawer isScrolled={isScrolled}/>
          ) : (
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
          ))}
        <MenuDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          handleDrawerClose={handleDrawerClose}
        />
      </Stack>
    </Box>
  );
}
