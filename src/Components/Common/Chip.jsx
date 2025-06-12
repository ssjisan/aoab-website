import { Typography, Stack } from "@mui/material";
import PropTypes from "prop-types";

export default function Chip({ chip }) {
  return (
    <Stack
      sx={{
        padding: "4px 16px",
        borderRadius: "100px",
        backgroundColor: "rgba(0, 50, 88, 0.16)",
        width:"fit-content"
      }}
    >
      <Typography
        color="primary"
        sx={{ fontWeight: 400, lineHeight: "14px", whiteSpace: "nowrap", fontSize:"12px" }}
      >
        {chip}
      </Typography>
    </Stack>
  );
}

Chip.propTypes = {
  chip: PropTypes.string.isRequired,
};
