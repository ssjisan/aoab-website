import {
  Drawer,
  IconButton,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Cross } from "../../../assets/Icons";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export default function BasicInfoDrawer({ open, toggleDrawer, profile }) {
  console.log(profile);
  const [name, setName] = useState(profile?.name || "");
  const [bmdcNo, setBmdcNo] = useState(profile?.bmdcNo || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [contactNumber, setContactNumber] = useState(
    profile?.contactNumber || ""
  );
  const [currentWorkingPlace, setCurrentWorkingPlace] = useState(
    profile?.currentWorkingPlace?.[0]?.name || ""
  );
  const [currentDesignation, setCurrentDesignation] = useState(
    profile?.currentWorkingPlace?.[0]?.designation || ""
  );
  const [postGraduationDegreeName, setPostGraduationDegreeName] = useState(""); // State for degree name
  const [postGraduationYear, setPostGraduationYear] = useState(""); // State for year of graduation

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBmdcNo(profile.bmdcNo || "");
      setEmail(profile.email || "");
      setContactNumber(profile.contactNumber || "");
      setCurrentWorkingPlace(profile?.currentWorkingPlace?.[0]?.name || "");
      setCurrentDesignation(
        profile?.currentWorkingPlace?.[0]?.designation || ""
      );

      // Check if postGraduationDegrees exist and set state
      if (profile?.postGraduationDegrees?.length > 0) {
        setPostGraduationDegreeName(
          profile?.postGraduationDegrees[0]?.degreeName || ""
        );
        setPostGraduationYear(
          profile?.postGraduationDegrees[0]?.yearOfGraduation || ""
        );
      }
    }
  }, [profile]);

  const handleSubmit = async () => {
    const updatedData = {
      name,
      email,
      bmdcNo,
      contactNumber,
      // Update currentWorkingPlace as an array of objects
      currentWorkingPlace: [
        {
          name: currentWorkingPlace,
          designation: currentDesignation,
        },
      ],
      // Adding postGraduationDegrees to the payload
      postGraduationDegrees: [
        {
          degreeName: postGraduationDegreeName,
          yearOfGraduation: postGraduationYear,
        },
      ],
    };

    try {
      const response = await axios.put("/update-basic-info", updatedData);
      if (response.status === 200) {
        window.location.reload();
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      // Extract error message from response
      const errorMessage =
        error.response?.data?.message || "An error occurred while updating.";

      toast.error(errorMessage);
    }
  };

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      <Stack sx={{ width: "360px" }} spacing={2}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: "1px solid rgba(145, 142, 175, 0.24)", p: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Edit Basic Info
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>
        <Stack sx={{ p: 2 }} gap="16px">
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Name
            </Typography>
            <TextField
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
              disabled={profile?.isBmdcVerified === true}
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              BM&DC Registration No
            </Typography>
            <TextField
              variant="outlined"
              value={bmdcNo}
              onChange={(e) => setBmdcNo(e.target.value)}
              fullWidth
              size="small"
              disabled={profile?.isBmdcVerified === true}
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Email
            </Typography>
            <TextField
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              disabled={profile?.isEmailVerified === true}
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Contact Number
            </Typography>
            <TextField
              variant="outlined"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              size="small"
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Current Working Place
            </Typography>
            <TextField
              variant="outlined"
              value={currentWorkingPlace}
              onChange={(e) => setCurrentWorkingPlace(e.target.value)}
              fullWidth
              size="small"
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Current Designation
            </Typography>
            <TextField
              variant="outlined"
              value={currentDesignation}
              onChange={(e) => setCurrentDesignation(e.target.value)}
              fullWidth
              size="small"
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Post Graduation Degree Name
            </Typography>
            <TextField
              variant="outlined"
              value={postGraduationDegreeName}
              onChange={(e) => setPostGraduationDegreeName(e.target.value)}
              fullWidth
              size="small"
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Year of Graduation
            </Typography>
            <TextField
              variant="outlined"
              value={postGraduationYear}
              onChange={(e) => setPostGraduationYear(e.target.value)}
              fullWidth
              size="small"
              type="number"
            />
          </Stack>
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

BasicInfoDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    bmdcNo: PropTypes.string,
    email: PropTypes.string,
    isEmailVerified: PropTypes.string,
    isBmdcVerified: PropTypes.string,
    contactNumber: PropTypes.string,
    currentWorkingPlace: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        designation: PropTypes.string,
      })
    ),
    postGraduationDegrees: PropTypes.arrayOf(
      PropTypes.shape({
        degreeName: PropTypes.string,
        yearOfGraduation: PropTypes.number,
      })
    ),
  }).isRequired,
};
