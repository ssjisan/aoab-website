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

import api from "../../../lib/api/axios";

export default function CourseDataDrawer({
  open,
  onClose,
  selectedCourseCategory,
  courseCategories,
  existingCourseData,
}) {
  const [existingFiles, setExistingFiles] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(false); // BOOLEAN
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [completionYear, setCompletionYear] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [removedFiles, setRemovedFiles] = useState([]);

  const fileInputRef = useRef(null);

  // FIX: convert string -> boolean safely
  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value === "true");
  };

  useEffect(() => {
    if (open && selectedCourseCategory) {
      if (existingCourseData) {
        setSelectedAnswer(!!existingCourseData.status);
        setCompletionYear(existingCourseData.completionYear || "");
        setExistingFiles(existingCourseData.documents || []);
        setSelectedFiles([]);
      } else {
        setSelectedAnswer(false);
        setSelectedFiles([]);
        setCompletionYear("");
        setExistingFiles([]);
        setRemovedFiles([]);
      }
    }
  }, [open, selectedCourseCategory, existingCourseData]);

  const selectedTypeOfParticipation = courseCategories?.find(
    (cat) => cat._id === selectedCourseCategory?._id,
  )?.typeOfParticipation;

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
      selectedTypeOfParticipation === 0 ? validFiles : [...prev, ...validFiles],
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveExistingFile = (index) => {
    const fileToRemove = existingFiles[index];

    if (!fileToRemove?._id) {
      return;
    }

    setRemovedFiles((prev) => [...prev, fileToRemove._id.toString()]);

    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async () => {
    if (selectedAnswer === true) {
      if (!completionYear.trim()) {
        toast.error("Please enter the year of completion.");
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
      formData.append("status", selectedAnswer); // BOOLEAN
      formData.append("completionYear", completionYear);

      selectedFiles.forEach((file) => {
        formData.append("documents", file);
      });

      removedFiles.forEach((fileId) => {
        formData.append("removedFiles", fileId);
      });

      const isUpdate = existingCourseData && existingCourseData._id;

      if (isUpdate) {
        formData.append("courseId", existingCourseData._id);
        await api.put(`/course_document/${existingCourseData._id}`, formData);
      } else {
        await api.post("/course_document", formData);
      }

      toast.success("Saved successfully!", { id: toastId });
      window.location.reload();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Failed to save course data.",
        { id: toastId },
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
          {/* YES / NO */}
          <Stack gap="8px" sx={{ mb: "24px" }}>
            <Typography sx={{ fontWeight: 700 }} variant="h6">
              {selectedCourseCategory
                ? `Have you attended ${selectedCourseCategory.courseName}?`
                : ""}
            </Typography>
            <RadioGroup
              value={String(selectedAnswer)}
              onChange={handleRadioChange}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />

              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
                disabled={existingCourseData?.status === true}
              />
            </RadioGroup>
          </Stack>

          {/* YES SECTION */}
          {selectedAnswer === true && (
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
                <Stack>
                  <Typography>Select file</Typography>
                  <Typography color="text.secondary">
                    Click to browse your files
                  </Typography>
                </Stack>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleFileChange}
                  multiple={selectedTypeOfParticipation === 1}
                />
              </Stack>

              {/* NEW FILES */}
              {selectedFiles.length > 0 && (
                <Stack>
                  {selectedFiles.map((file, index) => (
                    <Stack
                      key={index}
                      sx={{ p: "8px 16px", mt: "16px" }}
                      flexDirection="row"
                      justifyContent="space-between"
                      gap="16px"
                    >
                      <PDF />
                      <Stack sx={{ width: "60%" }}>
                        <Typography sx={{ wordBreak: "break-all" }}>
                          {file.name}
                        </Typography>
                        <Typography color="text.secondary">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </Stack>

                      <IconButton
                        onClick={() =>
                          setSelectedFiles((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <Cross color="black" size="20px" />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              )}

              {/* EXISTING FILES */}
              {existingFiles.length > 0 && (
                <Stack>
                  {existingFiles.map((file, index) => (
                    <Stack
                      key={index}
                      sx={{ p: "8px 16px", mt: "16px" }}
                      flexDirection="row"
                      justifyContent="space-between"
                      gap="16px"
                    >
                      <PDF />
                      <Stack sx={{ width: "60%" }}>
                        <Typography sx={{ wordBreak: "break-all" }}>
                          {file.name || file.url.split("/").pop()}
                        </Typography>
                        <Typography color="text.secondary">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </Stack>

                      <IconButton
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

          {/* SAVE */}
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
