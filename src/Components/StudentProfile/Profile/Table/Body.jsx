import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import CourseDataDrawer from "../CourseDataDrawer";
import { useState } from "react";

export default function Body({ profile }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const toggleDrawer = (open, course) => () => {
    setSelectedCourse(course); // Set the selected course with its data
    setOpenDrawer(open);
  };

  const courses = [
    {
      name: "aoBasicCourse",
      label: "AO Basic Course",
      question: "Did you complete AO Basic Course?",
    },
    {
      name: "aoAdvanceCourse",
      label: "AO Advanced Course",
      question: "Did you complete AO Advanced Course?",
    },
    {
      name: "aoMastersCourse",
      label: "AO Masters Course",
      question: "Have you completed AO Masters Course?",
    },
    {
      name: "aoaPediatricSeminar",
      label: "AOA Pediatric Seminar",
      question: "Have you completed AOA Pediatric Seminar?",
    },
    {
      name: "aoaPelvicSeminar",
      label: "AOA Pelvic Seminar",
      question: "Have you completed AOA Pelvic Seminar?",
    },
    {
      name: "aoaFootAnkleSeminar",
      label: "AOA Foot & Ankle Seminar",
      question: "Have you completed AOA Foot & Ankle Seminar?",
    },
    {
      name: "aoaOtherCourses",
      label: "AOA Other Courses",
      question:
        "Have you completed any other AOA Course (e.g., Non-Operative, Hybrid, etc.)?",
    },
    {
      name: "aoaFellowship",
      label: "AOA Fellowship",
      question: "Have you completed any AOA Fellowship?",
    },
    {
      name: "tableFaculty",
      label: "Table Faculty",
      question: "Have you worked as Table Faculty yet?",
    },
    {
      name: "nationalFaculty",
      label: "National Faculty",
      question: "Have you joined as National Faculty yet?",
    },
  ];

  if (!profile) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={3}
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
        const courseData = profile[course.name] || {};
        const courseStatus =
          courseData.status === null
            ? "N/A"
            : courseData.status === "yes"
            ? "Yes"
            : "No";

        const hasDocument =
          courseData.documents && courseData.documents.length > 0;

        return (
          <TableRow key={course.name}>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {course.label}
            </TableCell>
            <TableCell
              sx={{ border: "1px solid #ddd", p: "8px 16px", width: "64px" }}
            >
              {courseStatus}
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", p: "8px 16px" }}>
              {hasDocument ? (
                <a
                  href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                    courseData.documents[0].url
                  )}&embedded=true`}
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer"
                >
                  View Document
                </a>
              ) : (
                "No Document"
              )}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: "1px solid #ddd", width: "48px", p: "8px 16px" }}
            >
              <Button variant="soft" onClick={toggleDrawer(true, course)}>
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
      />
    </TableBody>
  );
}
