import { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import ProgressBar from "../../Common/ProgressBar";

export default function ProfileCard() {
  const [profile, setProfile] = useState(null); // Set initial state to null to avoid .map on an empty array

  useEffect(() => {
    // Function to load the profile data
    const loadProfileData = async () => {
      try {
        const { data } = await axios.get("/my-profile-data");
        setProfile(data); // Assuming data is an object, not an array
      } catch (err) {
        toast.error("Error loading profile:", err);
      }
    };

    // Call the function to load profile data
    loadProfileData();
  }, []);

  if (!profile) {
    return <Typography>Loading...</Typography>; // Display loading text until profile is fetched
  }

  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "12px",
        background: "#05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "16px",
      }}
      flexDirection="row"
      gap="16px"
    >
      <Box
        sx={{
          width: "80px",
          height: "80px",
          borderRadius: "8px",
        }}
      >
        {/* Replace the commented Avatar with the actual data */}
        <Avatar
          src={profile?.picture?.[0]?.url || ""} // Assuming the profile picture is the first image in the array
          alt="Profile"
          sx={{
            width: "80px",
            height: "80px",
            fontSize: "32px",
            color: "#FFF",
            backgroundImage: "url('/pp.png')",
            backgroundSize: "cover",
          }}
        >
          {profile?.name ? profile.name.charAt(0).toUpperCase() : "G"}{" "}
        </Avatar>
      </Box>
      <Stack
        gap="2px"
        sx={{ height: "inherit", width: "100%" }}
        justifyContent="flex-end"
      >
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          {profile.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.email}
        </Typography>
      </Stack>
      <Stack gap="2px" sx={{ height: "inherit" }} justifyContent="center">
        <ProgressBar done={90} />
      </Stack>
    </Stack>
  );
}
