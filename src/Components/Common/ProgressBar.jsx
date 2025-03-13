import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function ProgressBar({ done }) {
  const [style, setStyle] = useState({});
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      };
      setStyle(newStyle);
      setWidth(done); // Set the width based on the `done` prop
    }, 200);
  }, [done]);

  const progressBarContainerStyle = {
    backgroundColor: "#d8d8d8",
    borderRadius: "20px",
    position: "relative",
    margin: "15px 0",
    height: "8px",
    width: "300px",
  };

  const progressBarStyle = {
    background: "linear-gradient(to left, #91B512, #91B512)",
    boxShadow: "0 3px 3px -5px #F2709C, 0 2px 5px #F2709C",
    borderRadius: "20px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: `${width}%`,
    opacity: width === 0 ? 0 : 1,
    transition: "1s ease 0.3s",
  };

  const textContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px",
    width: "300px",
  };

  return (
    <Box sx={progressBarContainerStyle}>
      <Box sx={progressBarStyle} style={style}></Box>
      {/* This box will hold the percentage text */}
      <Box sx={textContainerStyle}>
        <Typography variant="body2" color="textSecondary">
          Your Profile is {done}% Complete
        </Typography>
      </Box>
    </Box>
  );
}
