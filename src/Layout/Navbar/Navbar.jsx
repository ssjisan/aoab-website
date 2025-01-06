import NavMenu from "./NavMenu";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Configure Style Start
  const NavSx = {
    position: "fixed",
    width: "100%",
    zIndex: 1000,
  };
  // Configure Style End

  return (
    <Box sx={NavSx}>
      <NavMenu isScrolled={isScrolled} />
    </Box>
  );
}
