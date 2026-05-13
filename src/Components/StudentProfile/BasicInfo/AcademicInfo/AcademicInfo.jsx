import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function AcademicInfo({ profile }) {
  const InfoRow = ({ label, value }) => (
    <Stack gap="4px">
      <Typography
        variant="body2"
        sx={{ fontWeight: 500 }}
        color="text.secondary"
      >
        {label}
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "#111827",
            wordBreak: "break-word",
          }}
        >
          {value || "N/A"}
        </Typography>
      </Stack>
    </Stack>
  );
  InfoRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    verification: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
  };
  return (
    <Stack
      sx={{
        borderRadius: "12px",
        border: "1px solid #05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        bgcolor: "#fff",
        height: "100%",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: "12px 16px", borderBottom: "1px solid #F3F4F6" }}
      >
        <Stack direction="row" alignItems="center" gap="8px">
          <Stack
            sx={{
              width: "40px",
              height: "40px",
              background: "#f0ecff",
              borderRadius: "8px",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#7C66CE" }}>
            Academic Info
          </Typography>
        </Stack>

        <Button variant="outlined" size="small">
          Edit
        </Button>
      </Stack>

      {/* Content */}
      <Stack sx={{ p: "16px" }} gap="16px">
        <InfoRow
          label="Year of Post Graduation"
          value={profile?.postGraduationDegrees?.[0]?.yearOfGraduation || "N/A"}
        />

        <InfoRow
          label="Post-Graduation Degree in Orthopedics"
          value={profile?.postGraduationDegrees?.[0]?.degreeName || "N/A"}
        />
      </Stack>
    </Stack>
  );
}

AcademicInfo.propTypes = {
  profile: PropTypes.shape({
    postGraduationDegrees: PropTypes.arrayOf(
      PropTypes.shape({
        yearOfGraduation: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        degreeName: PropTypes.string,
      }),
    ),
  }),
};
