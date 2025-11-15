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
  console.log("enrollments",enrollments);
  
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
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
