import { Button, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import SignatureUpload from "./SignatureUpload";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function Signature() {
  const { profile } = useContext(DataContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const signature = profile?.signature?.url;
  const hasSignature = Boolean(signature);

  const handleSignatureUpdate = (newImageUrl) => {
    profile.signature = { url: newImageUrl }; // optional optimistic update
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #05060f08",
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          background: "#fff",
          height: "100%",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: "12px 16px",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#003258",
            }}
          >
            Your Signature
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenDrawer(true)}
          >
            Upload Signature
          </Button>
        </Stack>

        {/* Content */}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent={hasSignature ? "flex-start" : "center"}
          sx={{
            px: 2,
            pb: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {hasSignature ? (
            <Stack
              sx={{
                width: 240,
                height: 120,
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#f8fafc",
              }}
            >
              <img
                src={signature}
                alt="Signature"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Stack>
          ) : (
            <Typography
              color="text.secondary"
              sx={{
                textAlign: "center",
                width: "100%",
                py: 4,
              }}
            >
              No signature uploaded yet.
            </Typography>
          )}
        </Stack>
      </Stack>

      <SignatureUpload
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        currentImage={signature}
        onSuccess={handleSignatureUpdate}
      />
    </>
  );
}
