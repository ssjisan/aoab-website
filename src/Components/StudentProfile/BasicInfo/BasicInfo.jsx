import { Grid, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";

import Basic from "./Basic/Basic";
import ProfessionalInfo from "./ProfessionalInfo/ProfessionalInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";

import { DataContext } from "../../../DataProcessing/DataProcessing";
import ProfileEditModal from "./ProfileEditModal";

export default function BasicInfo() {
  const { profile, refetchProfile } = useContext(DataContext);

  // --------------------------------------------------
  // MODAL STATE
  // --------------------------------------------------

  const [open, setOpen] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    title: "",
    fields: [],
    initialValues: {},
  });

  // --------------------------------------------------
  // OPEN MODAL FUNCTION
  // --------------------------------------------------

  const handleOpenModal = (type) => {
    // ----------------------------------------------
    // BASIC INFO
    // ----------------------------------------------

    if (type === "basic") {
      setModalConfig({
        title: "Edit Basic Information",

        initialValues: {
          name: profile?.name || "",

          email: profile?.email || "",

          bmdcNo: profile?.bmdcNo || "",

          contactNumber: profile?.contactNumber || "",
        },

        fields: [
          {
            name: "name",
            label: "Full Name",
            disabled: true,
          },

          {
            name: "email",
            label: "Email Address",
            disabled: true,
          },

          {
            name: "bmdcNo",
            label: "BMDC Registration Number",
            disabled: true,
          },

          {
            name: "contactNumber",
            label: "Contact Number",
          },
        ],
      });

      setOpen(true);

      return;
    }

    // ----------------------------------------------
    // PROFESSIONAL INFO
    // ----------------------------------------------

    if (type === "professional") {
      setModalConfig({
        title: "Edit Professional Information",

        initialValues: {
          currentWorkingPlace: {
            name: profile?.currentWorkingPlace?.name || "",

            designation: profile?.currentWorkingPlace?.designation || "",
          },
        },

        fields: [
          {
            name: "currentWorkingPlace.name",
            label: "Current Working Place",
          },

          {
            name: "currentWorkingPlace.designation",

            label: "Current Designation",
          },
        ],
      });

      setOpen(true);

      return;
    }

    // ----------------------------------------------
    // ACADEMIC INFO
    // ----------------------------------------------

    if (type === "academic") {
      setModalConfig({
        title: "Edit Academic Information",

        initialValues: {
          postGraduationDegree: {
            degreeName: profile?.postGraduationDegree?.degreeName || "",

            yearOfGraduation:
              profile?.postGraduationDegree?.yearOfGraduation || "",

            isCompleted: profile?.postGraduationDegree?.isCompleted || false,
          },
        },

        fields: [
          {
            name: "postGraduationDegree.degreeName",
            label: "Post Graduation Degree",
            disableWhen: {
              field: "postGraduationDegree.isCompleted",
              value: false,
            },
          },
          {
            name: "postGraduationDegree.yearOfGraduation",
            label: "Year Of Graduation",
            disableWhen: {
              field: "postGraduationDegree.isCompleted",
              value: false,
            },
          },
          {
            name: "postGraduationDegree.isCompleted",
            label: "I Have Completed This Degree",
            type: "checkbox",
          },
        ],
      });

      setOpen(true);
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <>
      <Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Basic onEdit={() => handleOpenModal("basic")} />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4}>
            <ProfessionalInfo onEdit={() => handleOpenModal("professional")} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4}>
            <AcademicInfo onEdit={() => handleOpenModal("academic")} />
          </Grid>
        </Grid>
      </Stack>

      {/* ------------------------------------------------ */}
      {/* REUSABLE MODAL */}
      {/* ------------------------------------------------ */}

      <ProfileEditModal
        open={open}
        onClose={() => setOpen(false)}
        title={modalConfig.title}
        fields={modalConfig.fields}
        initialValues={modalConfig.initialValues}
        endpoint="/update-basic-info"
        onSuccess={async () => {
          await refetchProfile();
        }}
      />
    </>
  );
}

BasicInfo.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,

    email: PropTypes.string,

    isEmailVerified: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

    bmdcNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    isBmdcVerified: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

    contactNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    currentWorkingPlace: PropTypes.shape({
      name: PropTypes.string,

      designation: PropTypes.string,
    }),

    postGraduationDegree: PropTypes.shape({
      degreeName: PropTypes.string,

      yearOfGraduation: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),

      isCompleted: PropTypes.bool,
    }),
  }),
};
