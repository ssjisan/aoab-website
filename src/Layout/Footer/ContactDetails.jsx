import { Box, Typography } from "@mui/material";

export default function ContactDetails() {
    const ContainerSx = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "32px",
        flexShrink: "0"
    }
    return (
        <Box sx={ContainerSx}>
            <Typography variant="body1" color="text.secondary">Promoting excellence in patient care and vocation for the needs of patients with Orthopeadic condition.</Typography>
        </Box>
    )
}
