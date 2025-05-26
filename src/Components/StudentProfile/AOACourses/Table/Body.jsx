import PropTypes from "prop-types";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import CourseDataDrawer from "../CourseDataDrawer";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Body({ profile }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]); // State to hold fetched courses

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/category_list");
        setCourses(response.data); // Assuming response is an array of course data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const toggleDrawer = (open, courseId) => {
    const selectedCourse = courses.find((course) => course._id === courseId);
    if (selectedCourse) {
      const profileData =
        profile.courses.find((course) => course?._id === courseId) || {};
      setSelectedCourse({ ...selectedCourse, ...profileData });
      setOpenDrawer(open);
    }
  };

  const closeDrawer = () => setOpenDrawer(false);

  if (!profile || !courses.length) {
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
      {courses.map((course) => {
        const courseData =
          profile.courses.find((c) => c._id === course._id) || {};
        const courseStatus =
          courseData && courseData.status != null
            ? courseData.status === "yes"
              ? "Yes"
              : "No"
            : "N/A";

        const completionYear = courseData?.completionYear || "N/A";

        const hasDocument =
          courseData?.documents && courseData.documents.length > 0;
        return (
          <TableRow key={course._id}>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {course.courseName}
            </TableCell>
            <TableCell
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "64px" }}
            >
              {courseStatus}
            </TableCell>
            <TableCell
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "64px" }}
            >
              {completionYear}
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {hasDocument ? (
                courseData.documents.length === 1 ? (
                  <a
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                      courseData.documents[0].url
                    )}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {courseData.documents[0].name}
                  </a>
                ) : (
                  <ol style={{ margin: 0, paddingLeft: "16px" }}>
                    {courseData.documents.map((doc) => (
                      <li key={doc.url} style={{ marginBottom: "8px" }}>
                        <a
                          href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                            doc.url
                          )}&embedded=true`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.name}
                        </a>
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
                onClick={() => toggleDrawer(true, course._id)}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
      <CourseDataDrawer
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        selectedCourse={selectedCourse}
        closeDrawer={closeDrawer}
        courses={courses}
      />
    </TableBody>
  );
}

Body.propTypes = {
  profile: PropTypes.shape({
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        courseId: PropTypes.string.isRequired, // Assuming courseId is a string that matches _id from the API
        status: PropTypes.string,
        documents: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
        completionYear: PropTypes.string,
      })
    ),
  }),
};
