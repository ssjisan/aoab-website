import Navbar from "../../Layout/Navbar/Navbar";
import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
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
import { Cross, Warning } from "../../assets/Icons";

export default function Profile() {
  const [profile, setProfile] = useState(null); // Set initial state to null to avoid .map on an empty array
  const [openApprovalModal, setOpenApprovalModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCloseModal = () => {
    setOpenApprovalModal(false);
  };
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

  const handleApplyForApproval = async () => {
    try {
      setLoading(true);

      const studentId = profile?._id; // get from loaded profile
      if (!studentId) {
        toast.error("Profile ID not found. Please reload.");
        return;
      }

      const response = await axios.put(`/apply-for-approval/${studentId}`);

      if (response.status === 200) {
        toast.success("Your account is now under review.");
        setProfile((prev) => ({
          ...prev,
          accountVerificationStatus: "under-review",
        }));
        setOpenApprovalModal(false);
      }
    } catch (err) {
      console.error("Error sending approval request:", err);
      toast.error("Failed to send approval request. Try again later.");
    } finally {
      setLoading(false);
    }
  };

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
          {profile?.accountVerificationStatus === "rejected" && (
            <Stack
              gap="8px"
              alignItems="center"
              justifyContent="space-between"
              flexDirection={"row"}
              sx={{
                background: "#FFE9D5",
                p: "8px 16px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ color: "#FF5630" }}>
                Remarks:<Box component="span" sx={{fontWeight:700}}>{profile?.remarks}</Box> . Remember, without approved account you
                can&apos;t apply for any course.
              </Typography>

              {/* Apply for Approval Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenApprovalModal(true)}
                sx={{ mt: 1 }}
              >
                Apply for Approval
              </Button>
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
      <Modal open={openApprovalModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "12px",
            width: "560px",
            maxWidth: "90%",
            boxShadow: 24,
            outline: "none", // important
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
    Are you sure you want to send approval for your account?
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <Cross size="24" color="black" />
            </IconButton>
          </Box>

          {/* Body */}
          <Stack spacing={3} alignItems="center" sx={{ px: 4, py: 3 }}>
            <Warning size="48px" color="#dc3545" />
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, textAlign: "center" }}
            >
              Without updating the recent documents from your last rejection,
              your account might be rejected again. Please ensure all required
              documents are up to date before submitting for approval.
            </Typography>
          </Stack>

          {/* Footer */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid rgba(145, 158, 171, 0.24)",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button
            onClick={handleApplyForApproval}
              variant="contained"
              color="success"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Sure"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
