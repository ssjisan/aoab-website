import { Box, Typography } from "@mui/material"
import { LocationBasic } from "../../assets/Icons";

export default function OtherLinks() {
    const ContainerSx = {
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        flexShrink: "0"
    }
    return (
        <Box sx={ContainerSx} >
            <Box>
                <LocationBasic />
            </Box>
            <Typography variant="subtitle1" color="text.secondary">Health and Hope Hospital 152/1/H, Green road, Panthopath(Green road Panthopath junction), Dhaka-1205</Typography>
        </Box>
    )
}

