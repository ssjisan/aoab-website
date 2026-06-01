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

import { createRef, useContext, useRef, useState } from "react";
import { DataContext } from "../../../../DataProcessing/DataProcessing";
import toast from "react-hot-toast";
import Badge from "../../../Common/Badge";
import api from "../../../../lib/api/axios";

export default function Body({
  loading,
  enrollmentDetails,
  handleEnrollments, // Call this function to refresh list after updates finish
  courseMap,
}) {
  const fileInputRefs = useRef({});
  const { auth } = useContext(DataContext);
  const studentId = auth?.user?._id;

  // Track specific uploading states and names matching unique item keys
  const [selectedFileNameMap, setSelectedFileNameMap] = useState({});
  const [uploadingId, setUploadingId] = useState(null);

  // Trigger click event on hidden file inputs
  const triggerFileInput = (id) => {
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id].click();
    }
  };

  // Handle stage when file selection is confirmed
  const handleFileChange = (e, data, recordKey) => {
    const file = e.target.files[0];
    if (!file) return;

    // Save selected filename reference into local tracker state
    setSelectedFileNameMap((prev) => ({
      ...prev,
      [recordKey]: file.name,
    }));

    // Trigger API dispatch sequence directly
    uploadFileSubmit(file, data, recordKey);
  };

  // Perform API Upload
  const uploadFileSubmit = async (file, data, recordKey) => {
    const course = courseMap?.[data.courseId];

    // 1. Fallbacks if dates or titles are missing
    const dateObj = course?.startDate ? new Date(course.startDate) : new Date();
    const courseTitle = course?.title || data.courseTitle || "unknown-course";

    // 2. Extract separate Year and Month strings
    const year = dateObj.getFullYear().toString(); // e.g. "2026"
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // e.g. "06"

    // 3. Format "AOA Basic" into "aoa_basic"
    const formattedCourseName = courseTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-_]/g, "") // Remove special symbols safely
      .replace(/\s+/g, "_"); // Replace all spaces with a single underscore

    const formData = new FormData();

    // 4. ADD TEXT FIELDS FIRST (Multer reads these sequentially)
    formData.append("courseId", data.courseId);
    formData.append("studentId", studentId || data.studentId);
    formData.append("year", year);
    formData.append("month", month);
    formData.append("courseFolder", formattedCourseName);

    // 5. ADD THE FILE LAST
    formData.append("paymentProof", file);

    setUploadingId(recordKey);
    const toastId = toast.loading("Uploading payment proof...");

    try {
      const response = await api.post(
        "/enrollment/upload-payment-proof",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.success) {
        toast.success("File uploaded successfully!", { id: toastId });
        if (handleEnrollments) handleEnrollments();
      } else {
        toast.error(response.data.message || "Failed to process receipt file", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Error connecting to server.",
        { id: toastId },
      );
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={7} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      ) : enrollmentDetails.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} align="center">
            <Stack alignItems="center" spacing={2}>
              <NoEnrollment />
              <Typography>No Enrollment History</Typography>
            </Stack>
          </TableCell>
        </TableRow>
      ) : (
        enrollmentDetails.map((data) => {
          // Fallback parsing key mapping adjustments
          const finalStudentId = studentId || data.studentId;
          const recordUniqueKey = `${data.courseId}-${finalStudentId}`;

          if (!fileInputRefs.current[recordUniqueKey]) {
            fileInputRefs.current[recordUniqueKey] = createRef();
          }

          const course = courseMap?.[data.courseId];
          let finalStatus = data.status;
          const now = new Date();

          if (course) {
            const eventEnd = new Date(course.endDate);
            const paymentDeadline = new Date(course.paymentReceiveEndDate);

            if (now > eventEnd) finalStatus = "expired";
            else if (
              now > paymentDeadline &&
              data.paymentReceived !== "approved"
            ) {
              finalStatus = "expired";
            }
          }

          const canUpload =
            data.paymentReceived !== "approved" &&
            !["waitlist", "confirmed", "expired"].includes(finalStatus);

          return (
            <TableRow key={recordUniqueKey}>
              <TableCell>{data.courseTitle}</TableCell>

              <TableCell>
                {data.enrolledAt
                  ? new Date(data.enrolledAt).toLocaleString()
                  : "-"}
              </TableCell>

              <TableCell>
                <Badge label={finalStatus} />
              </TableCell>

              <TableCell>
                <Badge label={data.paymentReceived} />
              </TableCell>

              <TableCell>
                {data.paymentProof?.url ? (
                  <a
                    href={data.paymentProof.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#1677ff", textDecoration: "underline" }}
                  >
                    View File
                  </a>
                ) : (
                  "No File"
                )}
              </TableCell>

              <TableCell>
                {data.remark ? (
                  <span style={{ color: "#a8071a" }}>{data.remark}</span>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                {canUpload && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <button
                      type="button"
                      disabled={uploadingId === recordUniqueKey}
                      onClick={() => triggerFileInput(recordUniqueKey)}
                      style={{
                        padding: "6px 12px",
                        cursor:
                          uploadingId === recordUniqueKey
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor: "#1677ff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      {uploadingId === recordUniqueKey
                        ? "Processing..."
                        : "Upload Proof"}
                    </button>
                    {selectedFileNameMap[recordUniqueKey] && (
                      <Typography
                        variant="caption"
                        noWrap
                        sx={{ maxWidth: 100 }}
                      >
                        {selectedFileNameMap[recordUniqueKey]}
                      </Typography>
                    )}
                  </Stack>
                )}

                <input
                  type="file"
                  accept="image/*,.pdf"
                  ref={(el) => (fileInputRefs.current[recordUniqueKey] = el)}
                  onChange={(e) => handleFileChange(e, data, recordUniqueKey)}
                  style={{ display: "none" }}
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
  loading: PropTypes.bool,
  handleEnrollments: PropTypes.func,
  courseMap: PropTypes.object,
};
