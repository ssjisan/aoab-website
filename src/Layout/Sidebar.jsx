import {
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import navConfig from "../Layout/Navbar/ProfileMenu";
import { useLocation, Link } from "react-router-dom";
import {useEffect, useRef } from "react";

export default function Sidebar() {
  const { pathname } = useLocation();
  const forBelow767 = useMediaQuery("(max-width:767px)");

  // Create refs for each item to track the position
  const itemRefs = useRef([]);

  // Scroll to the active tab
  useEffect(() => {
    // Find the active index based on the pathname
    const activeIndex = navConfig({ pathname }).findIndex(
      (item) => item.items[0].link === pathname
    );

    // Scroll to the active item if exists
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "center", // Ensure the active item is in the center
      });
    }
  }, [pathname]); // Runs when the pathname changes

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "100vh",
        overflowY: forBelow767 ? "scroll" : "auto", // Enable vertical scroll for large screens
        overflowX: forBelow767 ? "auto" : "hidden", // Enable horizontal scroll for small screens
        whiteSpace: "nowrap", // Prevent items from wrapping
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "row", // Horizontal for small screens, vertical for large
          alignItems: "center",
          justifyContent:forBelow767 ? "flex-start" :"center",
          gap: "24px",
          flexWrap: "nowrap",
          overflowX: forBelow767 ? "auto" : "hidden", // Enable horizontal scroll on small screens
          overflowY: forBelow767 ? "hidden" : "auto", // Enable vertical scroll on large screens
          scrollbarWidth: "thin", // Firefox support
          "&::-webkit-scrollbar": {
            height: forBelow767 ? "6px" : "8px", // Customize scrollbar size
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#9C27B0", // Scrollbar color
            borderRadius: "4px",
          },
        }}
      >
        {navConfig({ pathname })
          .filter((data) => data.title !== "Log out")
          .map((data, index) => {
            return (
              <ListItemButton
                component={Link}
                to={data.items[0].link}
                key={data.items[0].title}
                ref={(el) => (itemRefs.current[index] = el)} // Store reference to each item
                sx={{
                  borderRadius: "8px",
                  padding: "8px 12px",
                  height: "44px",
                  background: pathname === data.items[0].link ? "#FCECFF" : "transparent",
                  color: pathname === data.items[0].link ? "#9C27B0" : "#637381",
                  flex: "0 0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>{data.icon}</ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: pathname === data.items[0].link ? 600 : 500,
                    fontSize: "14px !important",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {data.items[0].title}
                </Typography>
              </ListItemButton>
            );
          })}
      </List>
    </Box>
  );
}
