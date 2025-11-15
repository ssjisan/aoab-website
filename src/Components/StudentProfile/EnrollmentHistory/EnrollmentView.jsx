import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import Header from "./Table/Header";

export default function EnrollmentView() {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
const [courseMap, setCourseMap] = useState({});

  const { auth } = useContext(DataContext);
  const studentId = auth?.user?._id;
  const loadStudentEnrollments = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(`/enrollment-history/student/${studentId}`);
      setEnrollments(res.data);
    } catch (err) {
      toast.error("Failed to load student's enrollment history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      loadStudentEnrollments();
    }
  }, [studentId]);

  const loadCoursesByIds = async () => {
  try {
    const ids = [...new Set(enrollments.map(e => e.courseId))];

    const responses = await Promise.all(
      ids.map(id => axios.get(`/courses_events/${id}`))
    );

    const map = {};
    responses.forEach((res, i) => {
      map[ids[i]] = res.data; // courseEvent data
    });

    setCourseMap(map);
  } catch (err) {
    toast.error("Failed to load course details",err.message);
  }
};
 
  useEffect(() => {
  if (enrollments.length > 0) {
    loadCoursesByIds();
  }
}, [enrollments]);

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      {enrollments
        ?.filter((item) => item.enrollment.remark)
        .map((item) => (
          <Box
            key={item._id}
            sx={{
              backgroundColor: "#ffe5e5",
              color: "#a8071a",
              borderRadius: "8px",
              p: 2,
              mb: 2,
              fontSize: "14px",
            }}
          >
            <strong>
              Payment for <em>{item?.title}</em> was rejected.
            </strong>
            <br />
            Reason: {item.enrollment.remark}
          </Box>
        ))}

      <TableContainer>
        <Table>
          <Header />
          <Body
            enrollmentDetails={enrollments}
            loading={loading}
            handleEnrollments={loadStudentEnrollments}
            courseMap={courseMap}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
