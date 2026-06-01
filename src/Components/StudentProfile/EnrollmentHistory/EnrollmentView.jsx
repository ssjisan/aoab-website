import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState, useContext, useMemo } from "react";

import toast from "react-hot-toast";
import Body from "./Table/Body";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import Header from "./Table/Header";
import api from "../../../lib/api/axios";

export default function EnrollmentView() {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [courseMap, setCourseMap] = useState({});

  const { auth } = useContext(DataContext);
  const studentId = auth?.user?._id;

  const loadStudentEnrollments = async () => {
    if (loading || !studentId) return;

    try {
      setLoading(true);
      const res = await api.get(`/enrollment-history/student/${studentId}`);
      console.log("ENROLLMENT API RESPONSE:", res.data);
      setEnrollments(res.data || []);
    } catch (err) {
      toast.error("Failed to load student's enrollment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) loadStudentEnrollments();
  }, [studentId]);

  const loadCoursesByIds = async () => {
    try {
      const ids = [
        ...new Set(enrollments.map((e) => e.courseId).filter(Boolean)),
      ];

      const responses = await Promise.all(
        ids.map((id) => api.get(`/courses_events/${id}`)),
      );

      const map = {};
      responses.forEach((res, i) => {
        map[ids[i]] = res.data;
      });

      setCourseMap(map);
    } catch (err) {
      toast.error("Failed to load course details");
    }
  };

  useEffect(() => {
    if (enrollments.length > 0) {
      loadCoursesByIds();
    }
  }, [enrollments]);

  // ✅ SAFE FLATTENING
  const flattenedRows = useMemo(() => {
    return enrollments.map((course) => ({
      _id: course._id,
      courseId: course.courseId,
      categoryId: course.categoryId,
      courseTitle: course.title,

      studentId: course.enrollment?.studentId,
      status: course.enrollment?.status,
      paymentReceived: course.enrollment?.paymentReceived,
      paymentProof: course.enrollment?.paymentProof,
      isAttend: course.enrollment?.isAttend,
      remark: course.enrollment?.remark,
      enrolledAt: course.enrollment?.enrolledAt,
    }));
  }, [enrollments]);

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer>
        <Table>
          <Header />
          <Body
            enrollmentDetails={flattenedRows}
            loading={loading}
            handleEnrollments={loadStudentEnrollments}
            courseMap={courseMap}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
