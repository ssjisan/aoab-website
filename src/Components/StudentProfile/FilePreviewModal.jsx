import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Cross } from "../../assets/Icons";

export default function FilePreviewModal({
  open,
  onClose,
  title = "Review",
  url,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDownload = async () => {
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop() || "file";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      fullScreen={isMobile}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: isMobile ? 1 : 2,
          py: 1,
        }}
      >
        {/* Title */}
        <span
          style={{
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "60%",
          }}
        >
          {!isMobile ? title : "Preview"}
        </span>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Button
            size="small"
            onClick={handleDownload}
            variant="outlined"
            disabled={!url}
            sx={{
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Download
          </Button>

          <IconButton onClick={onClose}>
            <Cross size="20px" color="#000" />
          </IconButton>
        </div>
      </DialogTitle>

      {/* Content */}
      <DialogContent
        sx={{
          p: 0,
          height: isMobile ? "100vh" : "85vh",
          display: "flex",
        }}
      >
        {url ? (
          <iframe
            src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
            title="File Preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: "#666",
            }}
          >
            No file to display
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

FilePreviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
};
