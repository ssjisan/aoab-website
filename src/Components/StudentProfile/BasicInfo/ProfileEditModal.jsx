import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Cross } from "../../../assets/Icons";
import api from "../../../lib/api/axios";

export default function ProfileEditModal({
  open,
  onClose,
  title,
  fields,
  initialValues,
  endpoint,
  onSuccess,
}) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // SET INITIAL DATA
  // --------------------------------------------------
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  // --------------------------------------------------
  // GET NESTED VALUE
  // --------------------------------------------------
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => {
      return acc?.[key];
    }, obj);
  };

  // --------------------------------------------------
  // HANDLE CHANGE (NESTED SUPPORT)
  // --------------------------------------------------
  const handleChange = (name, value) => {
    if (name.includes(".")) {
      const keys = name.split(".");

      setFormData((prev) => {
        const updated = { ...prev };
        let temp = updated;

        for (let i = 0; i < keys.length - 1; i++) {
          temp[keys[i]] = {
            ...temp[keys[i]],
          };
          temp = temp[keys[i]];
        }

        temp[keys[keys.length - 1]] = value;

        return updated;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.put(endpoint, formData);

      toast.success("Profile updated successfully");

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "94%", sm: "520px" },
            bgcolor: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.18)",
            outline: "none",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              px: 4,
              py: 3,
              borderBottom: "1px solid #E5E7EB",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px !important",
                fontWeight: 800,
                color: "#072439",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              Update your information below.
            </Typography>

            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                backgroundColor: "rgba(0,0,0,0.08)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.15)",
                },
              }}
            >
              <Cross size="22" color="#000" />
            </IconButton>
          </Box>

          {/* BODY */}
          <Stack spacing={2.5} sx={{ p: 4 }}>
            {fields.map((field) => {
              const value = getValue(formData, field.name);

              // CHECKBOX
              if (field.type === "checkbox") {
                return (
                  <FormControlLabel
                    key={field.name}
                    control={
                      <Checkbox
                        checked={value || false}
                        onChange={(e) =>
                          handleChange(field.name, e.target.checked)
                        }
                      />
                    }
                    label={field.label}
                  />
                );
              }

              return (
                <TextField
                  key={field.name}
                  label={field.label}
                  fullWidth
                  disabled={field.disabled}
                  value={value || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  type={field.type || "text"}
                  variant="outlined"
                  slotProps={{
                    input: {
                      startAdornment:
                        field.name === "contactNumber" ? (
                          <InputAdornment position="start">+880</InputAdornment>
                        ) : null,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      backgroundColor: field.disabled ? "#F9FAFB" : "#fff",
                    },
                  }}
                />
              );
            })}

            {/* FOOTER */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ pt: 2 }}
            >
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 3,
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={loading}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 3,
                  boxShadow: "none",
                }}
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

ProfileEditModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  fields: PropTypes.array,
  initialValues: PropTypes.object,
  endpoint: PropTypes.string,
  onSuccess: PropTypes.func,
};
