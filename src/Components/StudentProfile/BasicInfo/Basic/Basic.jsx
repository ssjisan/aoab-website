import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { BasicInfo } from "../../../../assets/Icons";
import { DataContext } from "../../../../DataProcessing/DataProcessing";
import { useContext } from "react";

export default function Basic({ onEdit }) {
  const { profile } = useContext(DataContext);
  const getVerificationIcon = (status) => {
    if (status === null) return "🔄";
    if (status === true) return "✅";
    if (status === false) return "❌";
    return null;
  };

  const InfoRow = ({ label, value, verification }) => (
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

        {verification && (
          <Typography
            component="span"
            sx={{
              fontSize: "18px",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {verification}
          </Typography>
        )}
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
              background: "#EAF7EA",
              borderRadius: "8px",
            }}
            justifyContent="center"
            alignItems="center"
          >
            <BasicInfo color="#4F985C" size="24px" />
          </Stack>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#4F985C" }}>
            Basic Info
          </Typography>
        </Stack>

        <Button variant="outlined" size="small" onClick={onEdit}>
          Edit
        </Button>
      </Stack>

      {/* Content */}
      <Stack sx={{ p: "16px" }} gap="16px">
        <InfoRow label="Name" value={profile?.name} />

        <InfoRow
          label="BM&DC Registration No"
          value={profile?.bmdcNo ? `A-${profile.bmdcNo}` : ""}
          verification={getVerificationIcon(profile?.isBmdcVerified)}
        />

        <InfoRow
          label="Email"
          value={profile?.email}
          verification={profile?.isEmailVerified === true ? "✅" : "❌"}
        />

        <InfoRow
          label="Contact Number"
          value={profile?.contactNumber ? `+880${profile.contactNumber}` : ""}
        />
      </Stack>
    </Stack>
  );
}

Basic.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    bmdcNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isBmdcVerified: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf([null]),
    ]),
    email: PropTypes.string,
    isEmailVerified: PropTypes.bool,
    contactNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onEdit: PropTypes.func.isRequired,
};
