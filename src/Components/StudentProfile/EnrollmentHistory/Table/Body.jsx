import {
  CircularProgress,
  Stack,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { NoEnrollment } from "../../../../assets/NoEnrollment";
import axios from "axios";
import { createRef, useContext, useRef, useState } from "react";
import { DataContext } from "../../../../DataProcessing/DataProcessing";
import toast from "react-hot-toast";
import Badge from "../../../Common/Badge";

export default function Body({
  loading,
  enrollmentDetails,
  handleEnrollments,
}) {
  const fileInputRefs = useRef({});
  const { auth } = useContext(DataContext);
  const [selectedFileNameMap, setSelectedFileNameMap] = useState({});
  console.log(enrollmentDetails);

  const studentId = auth?.user?._id;

  const handleUploadClick = (enrollmentId) => {
    fileInputRefs.current[enrollmentId]?.click();
  };

  const handleFileChange = async (e, enrollmentId) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileNameMap((prev) => ({ ...prev, [enrollmentId]: file.name }));

    const formData = new FormData();
    formData.append("paymentProof", file);
    formData.append("studentId", studentId); // optional but useful for extra validation
    formData.append("enrollmentId", enrollmentId);

    const toastId = toast.loading("Uploading...");

    try {
      await axios.post("/enrollment/upload-payment-proof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Upload successful!", { id: toastId });
      setSelectedFileNameMap((prev) => ({ ...prev, [enrollmentId]: "" }));
      if (typeof handleEnrollments === "function") {
        await handleEnrollments(); // ✅ refresh data
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong.";
      toast.error(`Upload failed: ${errorMessage}`, { id: toastId });
      setSelectedFileNameMap((prev) => ({ ...prev, [enrollmentId]: "" }));
    }
  };

  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={9} align="center" sx={{ height: 200 }}>
            <CircularProgress />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, fontWeight: 600 }}
            >
              Loading...
            </Typography>
          </TableCell>
        </TableRow>
      ) : enrollmentDetails.length === 0 ? (
        <TableRow>
          <TableCell colSpan={9} align="center" sx={{ height: 200 }}>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ width: "100%" }}
            >
              <NoEnrollment />
              <Typography variant="h5" color="text.secondary">
                No Enrollment History!
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      ) : (
        enrollmentDetails.map((data) => {
          const courseId = data.courseId?._id;
          if (!fileInputRefs.current[courseId]) {
            fileInputRefs.current[courseId] = createRef();
          }

          return (
            <TableRow key={data._id}>
              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                {data.title}
              </TableCell>

              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                {new Date(data.enrollment.enrolledAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </TableCell>

              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                <Badge label={data.enrollment.status} />
              </TableCell>

              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                <Badge label={data.enrollment.paymentReceived} />
              </TableCell>

              {/* 🆕 File Preview Cell */}
              <TableCell
                align="center"
                sx={{ border: "1px solid #ddd", width: 160 }}
              >
                {data.enrollment.paymentProof?.url ? (
                  <a
                    href={data.enrollment.paymentProof.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1976d2", textDecoration: "underline" }}
                  >
                    View Uploaded File
                  </a>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No File
                  </Typography>
                )}
              </TableCell>

              {/* 🆙 Upload Button Cell */}
              <TableCell align="center" sx={{ border: "1px solid #ddd" }}>
                {["enrolled", "rejected"].includes(data.enrollment.status) &&
                  ["pending", "rejected"].includes(
                    data.enrollment.paymentReceived?.toLowerCase()
                  ) && (
                    <button
                      onClick={() => handleUploadClick(data.enrollment._id)}
                    >
                      {selectedFileNameMap[data.enrollment._id]
                        ? "Uploading..."
                        : "Upload"}
                    </button>
                  )}

                <input
                  type="file"
                  accept="image/*"
                  ref={(ref) =>
                    (fileInputRefs.current[data.enrollment._id] = ref)
                  }
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, data.enrollment._id)}
                />
              </TableCell>
            </TableRow>
          );
        })
      )}
    </TableBody>
  );
}

Body.propTypes = {
  enrollmentDetails: PropTypes.array.isRequired,
  loading: PropTypes.string,
  handleEnrollments: PropTypes.string,
};
