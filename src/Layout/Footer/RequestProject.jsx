import { Box, Typography } from "@mui/material"
import { CallBasic, SMS } from "../../assets/Icons";

export default function RequestProject() {
    const PointSx = {
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        flexShrink: "0"
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Box sx={PointSx}>
                <Box>
                    <SMS />
                </Box>
                <Typography variant="subtitle1" color="text.secondary">info@posb-bd.com</Typography>
            </Box>
            <Box sx={PointSx}>
                <Box>
                    <CallBasic />
                </Box>
                <Typography variant="subtitle1" color="text.secondary">+880-1740-559555, +880-1716-281682</Typography>
            </Box>
        </Box>
    )
}
