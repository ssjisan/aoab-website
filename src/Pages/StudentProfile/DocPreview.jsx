import { Box, Button, Container, Typography } from "@mui/material";
import Navbar from "../../Layout/Navbar/Navbar";
import Sidebar from "../../Layout/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function DocPreview() {
  const canvasRef = useRef(null);
  const location = useLocation();
  const [fileUrl, setFileUrl] = useState(null);
  const [isPdf, setIsPdf] = useState(false);
  const [isCloudinaryPdf, setIsCloudinaryPdf] = useState(false);
  const [fileName, setFileName] = useState("document.pdf");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const url = query.get("url");
    if (!url) return;

    setFileUrl(url);

    const name = url.split("/").pop()?.split("?")[0] || "document.pdf";
    setFileName(name);

    const isPdfFile = url.toLowerCase().endsWith(".pdf");
    setIsPdf(isPdfFile);

    if (isPdfFile) {
      const isFromCloudinary = url.includes("cloudinary");
      setIsCloudinaryPdf(isFromCloudinary);

      if (!isFromCloudinary) {
        renderPdf(url);
      }
    }
  }, [location]);

  const renderPdf = (url) => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise
      .then((pdf) => {
        pdf.getPage(1).then((page) => {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: 1.5 });

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          page.render(renderContext);
        });
      })
      .catch((error) => {
        console.error("Error rendering PDF:", error.message);
      });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  if (!fileUrl) {
    return <Typography>Invalid document URL</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container sx={{ pt: "120px", pb: "120px" }}>
        <Sidebar />
        <Box p={4}>
          <Typography variant="h5" gutterBottom>
            Document Preview
          </Typography>

          <Box my={2}>
            {isPdf ? (
              isCloudinaryPdf ? (
                <iframe
  src={fileUrl}
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
  title="Cloudinary PDF Preview"
/>
              ) : (
                <canvas
                  ref={canvasRef}
                  style={{ border: "1px solid #ccc", maxWidth: "100%" }}
                />
              )
            ) : (
              <img
                src={fileUrl}
                alt="Preview"
                style={{ maxWidth: "100%", border: "1px solid #ccc" }}
              />
            )}
          </Box>

          <Button variant="contained" onClick={handleDownload}>
            Download as PDF
          </Button>
        </Box>
      </Container>
    </>
  );
}
