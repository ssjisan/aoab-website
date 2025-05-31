import PropTypes from "prop-types";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import CourseDataDrawer from "../CourseDataDrawer";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Body({ profile }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  const [existingCourseData, setExistingCourseData] = useState([]);
  useEffect(() => {
    // Fetch course data from the API
    const fetchCourseCategories = async () => {
      try {
        const response = await axios.get("/category_list");
        setCourseCategories(response.data);
      } catch (error) {
        toast.error("Error fetching courses:", error);
      }
    };

    fetchCourseCategories();
  }, []);

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
      {courseCategories.map((course) => {
        const courseData =
          profile.courses.find((c) => c.courseCategoryId === course._id) || {};
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
                onClick={() => {
                  setSelectedCourseCategory(course);
                  setOpenDrawer(true);

                  const matchedCourse = profile.courses.find(
                    (c) => String(c.courseCategoryId) === String(course._id)
                  );

                  if (matchedCourse) {
                    console.log("Matching course object found:", matchedCourse);
                    setExistingCourseData(matchedCourse);
                  } else {
                    console.log(
                      `Course Category ID "${course._id}" NOT present in profile.courses`
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
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        courseCategoryId: PropTypes.string.isRequired,
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
