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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Calender } from "../../../assets/Icons";

export default function BasicInfoDrawer({ open, toggleDrawer, profile }) {
  // *************************************************************TEST
  const CalenderIcon = () => {
    return <Calender color="grey" size={10} />;
  };

  //  *************************************************************Calling all data from db ************************************************************* //
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
        const postGradDegree = profile?.postGraduationDegrees[0];
        setPostGraduationDegreeName(postGradDegree?.degreeName || "");
        // Set the postGraduationYear as a Day.js object if it exists
        if (postGradDegree?.yearOfGraduation) {
          setPostGraduationYear(
            dayjs(`${postGradDegree.yearOfGraduation}-01-01`)
          ); // Use a dummy date (01-01) since only the year is needed
        }
      }
    }
  }, [profile]);
  //  *************************************************************Calling all data from db ************************************************************* //

  const currentYear = dayjs();
  const minYear = dayjs("1990-01-01");
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
  const [postGraduationYear, setPostGraduationYear] = useState(dayjs()); // State for year of graduation

  // Handle DatePicker Change
  const handleDateChange = (newValue) => {
    if (newValue) {
      setPostGraduationYear(dayjs(newValue)); // Ensure it is a valid dayjs object
    }
  };

  // ***************************************************************TEST

  const handleSubmit = async () => {
    const year = dayjs(postGraduationYear).isValid() ? dayjs(postGraduationYear).year() : null;
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
          yearOfGraduation: year,
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
              color="text.primary"
            >
              Year of Graduation
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{
                  textField: { size: "small" },
                }}
                slots={{
                  openPickerIcon: CalenderIcon,
                }}
                views={["year"]}
                minDate={minYear}
                maxDate={currentYear}
                value={
                  postGraduationYear
                    ? dayjs(`${postGraduationYear}-01-01`)
                    : null
                }
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} placeholder="YYYY" />
                )}
              />
            </LocalizationProvider>
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
