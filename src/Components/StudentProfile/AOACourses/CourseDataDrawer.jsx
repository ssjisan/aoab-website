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
import PropTypes from "prop-types";

import { useEffect, useRef, useState } from "react";
import { Cross } from "../../../assets/Icons";
import toast from "react-hot-toast";
import Upload from "../../../assets/Upload";
import PDF from "../../../assets/PDF";
import axios from "axios";

export default function CourseDataDrawer({
  open,
  onClose,
  selectedCourseCategory,
  courseCategories,
  existingCourseData,
}) {
  const [existingFiles, setExistingFiles] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [completionYear, setCompletionYear] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [removedFiles, setRemovedFiles] = useState([]);

  const isValidYearFormat =
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),\s\d{4}$/.test(
      completionYear
    );

  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  useEffect(() => {
    if (open && selectedCourseCategory) {
      if (existingCourseData) {
        setSelectedAnswer(existingCourseData.status);
        setCompletionYear(existingCourseData.completionYear || "");
        setExistingFiles(existingCourseData.documents || []);
        setSelectedFiles([]);
      } else {
        setSelectedAnswer(null);
        setSelectedFiles([]);
        setCompletionYear("");
      }
    }
  }, [open, selectedCourseCategory, existingCourseData]);

  const selectedTypeOfParticipation = courseCategories?.find(
    (cat) => cat._id === selectedCourseCategory?._id
  )?.typeOfParticipation;

  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];

    for (let file of files) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        continue;
      }

      if (file.size > 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 1MB.`);
        continue;
      }

      validFiles.push(file);
    }

    if (selectedTypeOfParticipation === 0 && validFiles.length > 1) {
      toast.error("Only one file allowed for this course.");
      return;
    }

    if (selectedTypeOfParticipation === 1) {
      const totalFiles = selectedFiles.length + validFiles.length;
      if (totalFiles > 5) {
        toast.error("You can upload up to 5 files.");
        return;
      }
    }

    setSelectedFiles((prev) =>
      selectedTypeOfParticipation === 0 ? validFiles : [...prev, ...validFiles]
    );

    // ✅ Clear file input value so same file can be reselected later
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveExistingFile = (index) => {
    const fileToRemove = existingFiles[index];
    setRemovedFiles((prev) => [...prev, fileToRemove._id || fileToRemove.id]);
    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      toast.error("Please select if you have attended the course.");
      return;
    }

    if (selectedAnswer === "yes") {
      if (!completionYear.trim()) {
        toast.error("Please enter the year of completion.");
        return;
      }

      if (!isValidYearFormat) {
        toast.error("Please enter the date in the format 'MMM, YYYY'.");
        return;
      }

      if (selectedFiles.length === 0 && existingFiles.length === 0) {
        toast.error("Please upload at least one file.");
        return;
      }
    }

    const toastId = toast.loading("Uploading...");

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("courseCategoryId", selectedCourseCategory._id);
      formData.append("status", selectedAnswer);
      formData.append("completionYear", completionYear);

      // Append new documents
      selectedFiles.forEach((file) => {
        formData.append("documents", file);
      });

      // Append removed file IDs if any
      if (removedFiles.length > 0) {
        removedFiles.forEach((fileId) => {
          formData.append("removedFiles", fileId); // This assumes backend expects `removedFiles[]`
        });
      }

      const isUpdate = existingCourseData && existingCourseData._id;

      if (isUpdate) {
        formData.append("courseId", existingCourseData._id);
        await axios.put(`/course_document/${existingCourseData._id}`, formData);
      } else {
        await axios.post("/course_document", formData);
      }
      window.location.reload();
      toast.success("Saved successfully!", { id: toastId });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error  || "Failed to save course data.",
        { id: toastId }
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Stack sx={{ maxWidth: "100%", width: "380px" }}>
        <Stack
          sx={{ p: 2, borderBottom: "1px solid rgba(145, 142, 175, 0.24)" }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {selectedCourseCategory?.courseName}
          </Typography>
          <IconButton onClick={onClose}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>

        <Stack sx={{ p: 2 }}>
          <Stack gap="8px" sx={{ mb: "24px" }}>
            <Typography sx={{ fontWeight: 700 }} variant="h6">
              {selectedCourseCategory
                ? `Have you attended ${selectedCourseCategory.courseName}?`
                : ""}
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
          {selectedAnswer === "yes" && (
            <>
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
                  ref={fileInputRef}
                  type="file"
                  name="pdfFile"
                  accept="application/pdf"
                  hidden
                  onChange={handleFileChange}
                  multiple={selectedTypeOfParticipation === 1}
                />
              </Stack>

              {selectedFiles.length > 0 && (
                <Stack>
                  {selectedFiles.map((file, index) => (
                    <Stack
                      sx={{ p: "8px 16px", mt: "16px" }}
                      flexDirection="row"
                      justifyContent="space-between"
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
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </Stack>
                      <IconButton
                        sx={{ width: "40px", height: "40px" }}
                        onClick={() =>
                          setSelectedFiles((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <Cross color="black" size="20px" />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              )}
              {existingFiles.length > 0 && (
                <Stack>
                  {existingFiles.map((file, index) => (
                    <Stack
                      sx={{ p: "8px 16px", mt: "16px" }}
                      flexDirection="row"
                      justifyContent="space-between"
                      gap="16px"
                      key={`existing-${index}`}
                    >
                      <PDF />
                      <Stack sx={{ width: "60%" }}>
                        <Typography
                          variant="body2"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {/* Show file name or url */}
                          {file.name || file.url.split("/").pop()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {/* Size in MB */}
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </Stack>
                      <IconButton
                        sx={{ width: "40px", height: "40px" }}
                        onClick={() => handleRemoveExistingFile(index)}
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
            onClick={handleSubmit}
            disabled={isUploading}
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
  onClose: PropTypes.func.isRequired,
  selectedCourseCategory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    typeOfParticipation: PropTypes.number.isRequired,
  }),
  courseCategories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      courseName: PropTypes.string,
      typeOfParticipation: PropTypes.number,
    })
  ),
  existingCourseData: PropTypes.shape({
    _id: PropTypes.string,
    status: PropTypes.string,
    completionYear: PropTypes.string,
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        size: PropTypes.number,
      })
    ),
  }),
};
