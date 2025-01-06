import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Linkedin } from "../../Assets/IconSet";

export default function SocialLinks() {
    const BoxSx = {
        display: "flex",
        alignItems: "center",
        gap: "24px"
    }
    return (
        <Box sx={BoxSx}>
            <Typography variant="subtitle1" sx={{ color: "#fff" }}>Terms</Typography>
            <Typography variant="subtitle1" sx={{ color: "#fff" }}>Policies</Typography>
            <Link to="https://www.facebook.com/insighttechbd">
                <Facebook />
            </Link>
            <Link to="https://www.linkedin.com/company/insighttechbd/">
                <Linkedin />
            </Link>
        </Box>
    )
}
