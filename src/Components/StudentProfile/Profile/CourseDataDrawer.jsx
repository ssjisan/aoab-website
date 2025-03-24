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
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Cross } from "../../../assets/Icons";
import axios from "axios";
import toast from "react-hot-toast";
import Upload from "../../../assets/Upload";
import PDF from "../../../assets/PDF";
import PropTypes from "prop-types";

export default function CourseDataDrawer({
  open,
  toggleDrawer,
  selectedCourse,
  updateTableData,
  closeDrawer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [removedFiles, setRemovedFiles] = useState([]);
  const [completionYear, setCompletionYear] = useState("");
  useEffect(() => {
    if (selectedCourse) {
      setSelectedAnswer(selectedCourse.status || "");
      setExistingDocuments(selectedCourse.documents || []);
      setCompletionYear(selectedCourse.completionYear || "");
    }
  }, [selectedCourse]);

  const multipleFileCourses = [
    "aoaOtherCourses",
    "aoNonOperativeCourse",
    "aoaFellowship",
    "tableFaculty",
    "nationalFaculty",
    "regionalFaculty",
  ];

  const isMultipleAllowed = multipleFileCourses.includes(selectedCourse?.name);

  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    if (isMultipleAllowed) {
      setSelectedFiles((prevFiles) => {
        const totalFiles = [...prevFiles, ...newFiles].slice(0, 5);
        return totalFiles;
      });
    } else {
      setSelectedFiles([newFiles[0]]);
    }
  };

  const handleRemoveFile = (file, source) => {
    if (source === "selectedFiles") {
      setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    } else if (source === "existingDocuments") {
      setExistingDocuments((prevDocs) =>
        prevDocs.filter((doc) => doc !== file)
      );
      // Track the removed file for backend processing
      setRemovedFiles((prevRemovedFiles) => [
        ...prevRemovedFiles,
        file, // Assuming 'file' contains enough data to identify the file (like public_id)
      ]);
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("fieldName", selectedCourse?.name);
    formData.append("status", selectedAnswer);
    formData.append("completionYear", completionYear); // Add this line

    // Add newly selected files
    if (selectedAnswer === "yes" && selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("documents", file));
    }

    // Add removed files info
    if (removedFiles.length > 0) {
      removedFiles.forEach((file) =>
        formData.append("removedFiles[]", file.public_id)
      ); // Using array syntax
    }

    try {
      const response = await axios.post("/update-course", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Course updated successfully!");
        window.location.reload();
        // Refresh the existing documents with new ones
        setExistingDocuments([...existingDocuments, ...selectedFiles]);
        setSelectedFiles([]);
        setRemovedFiles([]); // Reset removed files

        if (updateTableData) {
          updateTableData(response.data);
        }

        toggleDrawer(false)();
      } else {
        toast.error(response.data.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle specific error cases
      if (error.response) {
        const errorData = error.response.data;

        // Display backend validation errors
        if (errorData.error) {
          toast.error(errorData.error); // Show specific error message from the backend
        } else if (errorData.message) {
          toast.error(errorData.message); // General message from backend
        } else {
          toast.error("An error occurred while updating the course.");
        }
      } else {
        toast.error("An error occurred while updating the course.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Drawer open={open} onClose={closeDrawer} anchor="right">
      <Stack sx={{ maxWidth: "100%", width: "380px" }}>
        <Stack
          sx={{ p: 2, borderBottom: "1px solid rgba(145, 142, 175, 0.24)" }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            AOA Courses & Others
          </Typography>
          <IconButton onClick={closeDrawer}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Stack gap="8px" sx={{ mb: "24px" }}>
            <Typography sx={{ fontWeight: 700 }} variant="h6">
              {selectedCourse?.question}
            </Typography>
            <RadioGroup
              value={selectedAnswer}
              onChange={handleRadioChange}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
          <Stack gap="8px" sx={{ mb: "16px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              Year of Completion (Month, Year)
            </Typography>
            <TextField
              variant="outlined"
              value={completionYear}
              onChange={(e) => setCompletionYear(e.target.value)}
              fullWidth
              placeholder="MMM, YYYY"
              size="small"
            />
          </Stack>
          {selectedAnswer === "yes" && (
            <>
              <Stack
                sx={{
                  p: "8px 16px",
                  border: "1px dashed rgba(145, 158, 171, 0.32)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                flexDirection="row"
                gap="16px"
                component="label"
              >
                <Upload />
                <Stack gap="0px">
                  <Typography>Select file</Typography>
                  <Typography color="text.secondary">
                    Click to browse your files
                  </Typography>
                </Stack>
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleFileChange}
                  multiple={isMultipleAllowed}
                />
              </Stack>

              {/* Display Previously Uploaded Files */}
              {existingDocuments.length > 0 && (
                <Stack>
                  {existingDocuments.map((doc, index) => (
                    <Stack
                      sx={{ p: "8px 16px", mt: "16px" }}
                      flexDirection="row"
                      gap="16px"
                      key={index}
                    >
                      <PDF />
                      <Stack sx={{ width: "60%" }}>
                        <Typography
                          variant="body2"
                          component="a"
                          href={doc.url}
                          target="_blank"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {doc.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {(doc.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </Stack>
                      <IconButton
                        onClick={() =>
                          handleRemoveFile(doc, "existingDocuments")
                        }
                        sx={{ width: "40px", height: "40px" }}
                      >
                        <Cross color="black" size="20px" />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              )}

              {/* Display Newly Selected Files */}
              {selectedFiles.length > 0 && (
                <Stack>
                  {selectedFiles.map((file, index) => (
                    <Stack
                      sx={{ p: "8px 16px", mt: "16px" }}
                      flexDirection="row"
                      gap="16px"
                      key={index}
                    >
                      <PDF />
                      <Stack sx={{ width: "60%" }}>
                        <Typography
                          variant="body2"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {" "}
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </Stack>
                      <IconButton
                        onClick={() => handleRemoveFile(file, "selectedFiles")}
                        sx={{ width: "40px", height: "40px" }}
                      >
                        <Cross color="black" size="20px" />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              )}
            </>
          )}

          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#111827", color: "#fff" }}
            onClick={handleSave}
          >
            {isUploading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

CourseDataDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  selectedCourse: PropTypes.shape({
    name: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    status: PropTypes.string,
    completionYear: PropTypes.string,
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        public_id: PropTypes.string, // Optional field
      })
    ),
  }),
  updateTableData: PropTypes.func,
  closeDrawer: PropTypes.func.isRequired,
};
