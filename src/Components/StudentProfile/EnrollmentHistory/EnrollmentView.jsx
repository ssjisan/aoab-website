import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import Header from "./Table/Header";
// import CustomeHeader from "../../Common/Table/CustomeHeader";

export default function EnrollmentView() {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
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

  const columns = [
    { key: "name", label: "Name" },
    { key: "bmdcNo	", label: "BM&DC No" },
    { key: "contact	", label: "Contact" },
    { key: "enrollmentDate", label: "Enrollment Date" },
    { key: "status	", label: "Status" },
    { key: "payment	", label: "Payment" },
  ];

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      {enrollments
        ?.filter((item) => item.remark)
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
        Payment for <em>{item?.courseId?.title}</em> was rejected.
            </strong>
            <br />
            Reason: {item.remark}
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
