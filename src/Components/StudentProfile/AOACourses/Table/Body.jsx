import PropTypes from "prop-types";
import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CourseDataDrawer from "../CourseDataDrawer";
import { useState, useEffect, useContext } from "react";

import toast from "react-hot-toast";
import api from "../../../../lib/api/axios";
import { DataContext } from "../../../../DataProcessing/DataProcessing";
import FilePreviewModal from "../../FilePreviewModal";

export default function Body() {
  const { profile } = useContext(DataContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  const [existingCourseData, setExistingCourseData] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    const fetchCourseCategories = async () => {
      try {
        const response = await api.get("/category_list");
        setCourseCategories(response.data);
      } catch (error) {
        toast.error("Error fetching courses", error.message);
      }
    };

    fetchCourseCategories();
  }, []);

  const handlePreview = (doc) => {
    setPreviewFile(doc);
    setPreviewOpen(true);
  };

  if (!profile || !courseCategories.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={5}
            sx={{ border: "1px solid #ddd", textAlign: "center" }}
          >
            Loading...
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {courseCategories.map((courseCategory) => {
        const courseData =
          profile.courses.find(
            (c) => c.courseCategoryId === courseCategory._id,
          ) || {};

        const completionYear = courseData?.completionYear || "-";
        const hasDocument =
          courseData?.documents && courseData.documents.length > 0;
        return (
          <TableRow key={courseCategory._id}>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {courseCategory.courseName}
            </TableCell>
            <TableCell
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "64px" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  backgroundColor: courseData?.status ? "#E8F5E9" : "#FDECEC",
                  color: courseData?.status ? "#2E7D32" : "#D32F2F",
                }}
              >
                {courseData?.status ? "yes" : "no"}
              </Box>{" "}
            </TableCell>
            <TableCell
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "120px" }}
            >
              {completionYear}
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {hasDocument ? (
                courseData.documents.length === 1 ? (
                  (() => {
                    const doc = courseData.documents[0];

                    return (
                      <Typography
                        variant="text"
                        onClick={() => handlePreview(doc)}
                        sx={{
                          color: "#1E88E5",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {doc.name}
                      </Typography>
                    );
                  })()
                ) : (
                  // Handle multiple documents
                  <ol style={{ margin: 0, paddingLeft: "16px" }}>
                    {courseData.documents.map((doc) => (
                      <li
                        key={doc.url}
                        style={{
                          marginBottom: "8px",
                          color: "#1E88E5",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => handlePreview(doc)}
                      >
                        {doc.name}
                      </li>
                    ))}
                  </ol>
                )
              ) : (
                "No Document"
              )}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "64px" }}
            >
              <Button
                variant="soft"
                onClick={() => {
                  setSelectedCourseCategory(courseCategory);
                  setOpenDrawer(true);

                  const matchedCourse = profile.courses.find(
                    (c) =>
                      String(c.courseCategoryId) === String(courseCategory._id),
                  );

                  if (matchedCourse) {
                    console.log("Matching course object found:", matchedCourse);
                    setExistingCourseData(matchedCourse);
                  } else {
                    console.log(
                      `Course Category ID "${courseCategory._id}" NOT present in profile.courses`,
                    );
                    setExistingCourseData(null);
                  }
                }}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
      <FilePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={previewFile?.name || "Document Preview"}
        url={previewFile?.url}
      />
      <CourseDataDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        selectedCourseCategory={selectedCourseCategory}
        profile={profile}
        courseCategories={courseCategories}
        existingCourseData={existingCourseData}
      />
    </TableBody>
  );
}

Body.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        courseId: PropTypes.string, // new: must be set in DB
        courseCategoryId: PropTypes.string.isRequired,
        status: PropTypes.string,
        documents: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }),
        ),
        completionYear: PropTypes.string,
        systemUpload: PropTypes.bool,
      }),
    ),
  }),
};
