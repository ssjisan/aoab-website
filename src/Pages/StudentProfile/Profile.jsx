import Navbar from "../../Layout/Navbar/Navbar";
import { Container, Stack, Typography } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProfileAlert from "../../Components/StudentProfile/ProfileAlert";
import BasicInfo from "../../Components/StudentProfile/BasicInfo/BasicInfo";
import AOACourses from "../../Components/StudentProfile/AOACourses/AOACourses";
import ProfileCard from "../../Components/StudentProfile/ProfileCard/ProfileCard";
import Signature from "../../Components/StudentProfile/Signature/Signature";
import Certificate from "../../Components/StudentProfile/Certificate/Certificate";

export default function Profile() {
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

  return (
    <div>
      <Navbar />
      <Container sx={{ pt: "120px", pb: "120px" }}>
        <Sidebar />
        <Stack
          sx={{
            width: "100%",
            borderBottom: "1px solid rgba(145, 142, 175, 0.24)",
            pb: "8px",
            mt: "40px",
            mb: "40px",
          }}
          gap="4px"
        >
          <Typography sx={{ fontWeight: "700" }}>Profile Update</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Keep your profile updated with all accurate information.
          </Typography>
        </Stack>
        <Stack gap="24px">
          <ProfileCard profile={profile} />
          {profile?.remarks && (
            <Stack
              gap="8px"
              alignItems="center"
              justifyContent="center"
              sx={{
                background: "#FFE9D5",
                p: "8px 16px",
                borderRadius: "12px",
                height: "48px",
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ color: "#FF5630" }}>
                {profile?.remarks}
              </Typography>
            </Stack>
          )}
          <BasicInfo profile={profile} />
          {profile?.postGraduationDegrees?.[0]?.isCompleted && (
            <Certificate profile={profile} />
          )}
          <Signature profile={profile} />
          <AOACourses profile={profile} />
        </Stack>
      </Container>
      <ProfileAlert profile={profile} />
    </div>
  );
}
