import {
  Drawer,
  IconButton,
  Stack,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Cross } from "../../../assets/Icons";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export default function BasicInfoDrawer({ open, toggleDrawer, profile }) {
  //  *************************************************************Calling all data from db ************************************************************* //

  useEffect(() => {
    if (profile) {
      setName(profile.name || "N/A");
      setBmdcNo(profile.bmdcNo || "N/A");
      setEmail(profile.email || "N/A");
      setContactNumber(profile.contactNumber || "N/A");
      setCurrentWorkingPlace(profile?.currentWorkingPlace?.[0]?.name || "N/A");
      setCurrentDesignation(
        profile?.currentWorkingPlace?.[0]?.designation || "N/A"
      );

      const degree = profile?.postGraduationDegrees?.[0];

      setPostGraduationDegreeName(
        degree?.degreeName ? degree.degreeName : "N/A"
      );
      setPostGraduationYear(
        degree?.yearOfGraduation ? degree.yearOfGraduation.toString() : "N/A"
      );
      setPostGraduationIsComplete(
        typeof degree?.isCompleted === "boolean"
          ? degree.isCompleted.toString()
          : null
      );
    }
  }, [profile]);

  //  *************************************************************Calling all data from db ************************************************************* //

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
  const [postGraduationIsComplete, setPostGraduationIsComplete] =
    useState(null);


  const handleSubmit = async () => {
    const isCompleted = postGraduationIsComplete === "true";

    // Validation when post graduation is marked as complete
    if (isCompleted) {
      if (
        !postGraduationDegreeName?.trim() ||
        postGraduationDegreeName === "Not Yet" ||
        postGraduationDegreeName === "N/A"
      ) {
        toast.error("Please enter the Post Graduation Degree Name.");
        return;
      }
      if (
        !postGraduationYear?.trim() ||
        postGraduationYear === "Not Yet" ||
        postGraduationYear === "N/A"
      ) {
        toast.error("Please enter the Year of Post Graduation.");
        return;
      }
    }

    const degreeName = isCompleted
      ? postGraduationDegreeName.trim()
      : "Not Yet";
    const yearOfGraduation = isCompleted
      ? postGraduationYear.trim()
      : "Not Yet";

    // Trimmed values
    const trimmedWorkingPlace = currentWorkingPlace?.trim();
    const trimmedDesignation = currentDesignation?.trim();

    const updatedData = {
      name: name || "N/A",
      email: email || "N/A",
      bmdcNo: bmdcNo || "N/A",
      contactNumber: contactNumber || "N/A",
      currentWorkingPlace: [
        {
          name:
            !trimmedWorkingPlace || trimmedWorkingPlace === "N/A"
              ? null
              : trimmedWorkingPlace,
          designation:
            !trimmedDesignation || trimmedDesignation === "N/A"
              ? null
              : trimmedDesignation,
        },
      ],
      postGraduationDegrees: [
        {
          degreeName,
          yearOfGraduation,
          isCompleted,
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
              color="text.primary"
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
              color="text.primary"
            >
              BM&DC Registration No
            </Typography>
            <TextField
              variant="outlined"
              value={bmdcNo}
              onChange={(e) => setBmdcNo(e.target.value)}
              fullWidth
              size="small"
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">A-</InputAdornment>
                  ),
                },
              }}
              disabled={profile?.isBmdcVerified === true}
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
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
              color="text.primary"
            >
              Contact Number
            </Typography>
            <TextField
              variant="outlined"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              size="small"
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">+880</InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
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
              color="text.primary"
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
              color="text.primary"
            >
              Have you completed your Post Graduation?
            </Typography>
            <RadioGroup
              row
              value={postGraduationIsComplete}
              onChange={(e) => setPostGraduationIsComplete(e.target.value)}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
            >
              Post Graduation Degree Name
            </Typography>
            <TextField
              variant="outlined"
              value={postGraduationDegreeName}
              onChange={(e) => setPostGraduationDegreeName(e.target.value)}
              fullWidth
              size="small"
              required={
                postGraduationIsComplete === "true" && !postGraduationDegreeName
              }
              disabled={postGraduationIsComplete === "false"}
            />
          </Stack>

          <Stack gap="8px">
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.primary"
            >
              Year of Post Graduation
            </Typography>
            <TextField
              variant="outlined"
              value={
                postGraduationYear === "Not Yet" ||
                isNaN(Number(postGraduationYear))
                  ? "-"
                  : postGraduationYear
              }
              onChange={(e) => setPostGraduationYear(e.target.value)}
              // type={postGraduationIsComplete === true ? "number" : "text"}
              disabled={postGraduationIsComplete === "false"}
              required={
                postGraduationIsComplete === "true" && !postGraduationYear
              }
              fullWidth
              size="small"
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
        yearOfGraduation: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        isCompleted: PropTypes.bool,
      })
    ),
  }).isRequired,
};
