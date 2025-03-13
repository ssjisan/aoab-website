import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LeftArrow } from "../../assets/Icons";

export default function ComingSoon() {
    return (
        <Box sx={{
            backgroundImage: "url('comingsoon.jpg')", backgroundSize: "cover",
            backgroundRepeat: "no-repeat", backgroundPosition: 'center', height:"100vh"
        }}>
            <Container sx={{pt:"240px", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Typography variant="h1" sx={{textAlign:"center"}}>UNDER CONSTRUCTION</Typography>
                <Typography variant="h5" color="text.secondary" sx={{mb:"80px"}}>This will be worth the wait</Typography>
                <Link to="/"><Button startIcon={<LeftArrow size="20px"/>}>Back to Home</Button></Link>
            </Container>
        </Box>
    )
}
