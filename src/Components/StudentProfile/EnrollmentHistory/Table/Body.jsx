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

  const studentId = auth?.user?._id;

  const handleUploadClick = (courseId) => {
    if (fileInputRefs.current[courseId]) {
      fileInputRefs.current[courseId].click();
    }
  };

  const handleFileChange = async (e, courseId) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileNameMap((prev) => ({ ...prev, [courseId]: file.name }));

    const formData = new FormData();
    formData.append("paymentProof", file);
    formData.append("studentId", studentId);
    formData.append("courseId", courseId);

    const toastId = toast.loading("Uploading...");

    try {
      const response = await axios.post(
        "/enrollment/upload-payment-proof",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Upload successful!", { id: toastId });
      setSelectedFileNameMap((prev) => ({ ...prev, [courseId]: "" }));
      if (typeof handleEnrollments === "function") {
        await handleEnrollments(); // ✅ refresh data
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong.";
      toast.error(`Upload failed: ${errorMessage}`, { id: toastId });
      setSelectedFileNameMap((prev) => ({ ...prev, [courseId]: "" }));
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
                {data.courseId?.title}
              </TableCell>

              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                {new Date(data.enrolledAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </TableCell>

              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                <Badge label={data.status} />
              </TableCell>

              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                <Badge label={data.paymentReceived} />
              </TableCell>

              <TableCell align="left" sx={{ border: "1px solid #ddd" }}>
                {data.paymentProof?.url ? (
                  <a
                    href={data.paymentProof.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1976d2", textDecoration: "underline" }}
                  >
                    View Uploaded File
                  </a>
                ) : (
                  <>
                    No File &nbsp;
                    {!["expired", "waitlist"].includes(data.status) && (
                      <button onClick={() => handleUploadClick(courseId)}>
                        Upload
                      </button>
                    )}
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={(ref) => (fileInputRefs.current[courseId] = ref)}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, courseId)}
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
