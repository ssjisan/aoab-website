import {
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Cross } from "../../../assets/Icons";
import axios from "axios";
import toast from "react-hot-toast";

export default function CourseDataDrawer({
  open,
  toggleDrawer,
  selectedCourse,
  updateTableData,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // Loading state

  // List of courses that allow multiple file uploads
  const multipleFileCourses = [
    "aoaOtherCourses",
    "aoaFellowship",
    "tableFaculty",
    "nationalFaculty",
  ];

  const isMultipleAllowed = multipleFileCourses.includes(selectedCourse?.name);

  useEffect(() => {
    if (selectedCourse) {
      setSelectedAnswer(selectedCourse.status || null);
      setExistingDocuments(selectedCourse.documents || []);
    }
  }, [selectedCourse]);

  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleFileChange = (event) => {
    if (isMultipleAllowed) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...event.target.files]);
    } else {
      setSelectedFiles([event.target.files[0]]);
    }
  };

  const handleSave = async () => {
    setIsUploading(true); // Start loading
    const formData = new FormData();
    formData.append("fieldName", selectedCourse?.name);
    formData.append("status", selectedAnswer);

    if (selectedAnswer === "yes" && selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("documents", file));
    }

    try {
      const response = await axios.post("/update-course", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Course updated successfully!");
        if (updateTableData) {
          updateTableData(response.data);
        }
        setSelectedAnswer(null);
        setSelectedFiles([]);
        toggleDrawer(false)();
      } else {
        toast.error(response.data.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the course.");
    } finally {
      setIsUploading(false); // Stop loading after success or error
    }
  };

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      <Stack sx={{ width: "320px" }}>
        <Stack
          sx={{ p: 2, borderBottom: "1px solid rgba(145, 142, 175, 0.24)" }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            AOA Courses & Others
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Typography sx={{ mb: 2 }} variant="h6">
            {selectedCourse?.question}
          </Typography>
          <RadioGroup value={selectedAnswer} onChange={handleRadioChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          {selectedAnswer === "yes" && (
            <>
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}
                disabled={isUploading} // Disable button while uploading
              >
                {isUploading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Upload Document"}
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleFileChange}
                  multiple={isMultipleAllowed}
                />
              </Button>

              {selectedFiles.length > 0 &&
                selectedFiles.map((file, index) => (
                  <Typography key={index} variant="body2" sx={{ mt: 1 }}>
                    {file.name}
                  </Typography>
                ))}

              {existingDocuments.length > 0 && selectedFiles.length === 0 && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Existing Documents:
                  {existingDocuments.map((doc, index) => (
                    <div key={index}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document {index + 1}
                      </a>
                    </div>
                  ))}
                </Typography>
              )}
            </>
          )}
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#111827", color: "#fff" }}
            onClick={handleSave}
            disabled={!selectedAnswer || isUploading} // Disable button while uploading
          >
            {isUploading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
