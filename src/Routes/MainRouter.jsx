// MainRoute.jsx
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import Layout from "./Layout"; // Main website layout

// Pages
import Home from "../Pages/Home";
import ClinicalResearch from "../Pages/ClinicalResearch";
import Videos from "../Pages/Videos";
import OnlineLearning from "../Pages/OnlineLearning";
import AboutUs from "../Pages/AboutUs";
import EducationTraining from "../Pages/EducationTraining";
import EventDetails from "../Pages/EventDetails";
import Links from "../Pages/Links";
import Forms from "../Pages/Forms";
import Gallery from "../Pages/Gallery";
import Login from "../Pages/UserAuth/Login";
import ForgotPassword from "../Pages/UserAuth/ForgotPassword";
import OTPVerify from "../Pages/UserAuth/OTPVerify";
import OTPVerifyForRestPassword from "../Pages/UserAuth/OTPVerifyForRestPassword";
import ResetPassword from "../Pages/UserAuth/ResetPassword";
import Registration from "../Pages/UserAuth/Registration";
import AdminLoginAsStudent from "../Pages/AdminLoginAsStudent";
import ByPassLogin from "../Pages/UserAuth/ByPassLogin";

// Protected Pages
import Profile from "../Pages/StudentProfile/Profile";
import Certificates from "../Pages/StudentProfile/Certificates";
import EnrollmentHistory from "../Pages/StudentProfile/EnrollmentHistory";
import Password from "../Pages/StudentProfile/Password";
import EnrollmentCourse from "../Pages/EnrollmentCourse";
import DocPreview from "../Pages/StudentProfile/DocPreview";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import ProfileLayout from "./ProfileLayout";
import Maintenance from "../Pages/Maintenance";
import AuthLayout from "../Pages/UserAuth/AuthLayout";

export default function MainRoute() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#59B259",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#59B259",
            },
          },
          error: {
            style: {
              background: "#EC4034",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EC4034",
            },
          },
        }}
      />

      <Routes>
        {/* ========================================
            PUBLIC WEBSITE ROUTES (Main Layout)
        ======================================== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clinical-research" element={<ClinicalResearch />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/online-learning" element={<OnlineLearning />} />
          <Route
            path="/educations&training/aoa-bangladesh"
            element={<EducationTraining />}
          />
          <Route path="/course_event/:id" element={<EventDetails />} />
          <Route path="/links&forms/forms" element={<Forms />} />
          <Route path="/links&forms/links" element={<Links />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route element={<PrivateRoute />}>
            <Route path="/videos" element={<Videos />} />
          </Route>
        </Route>
        {/* ========================================
           Authentication Routes (No Main Layout, uses AuthLayout)
        ======================================== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OTPVerify />} />
          <Route
            path="/verify-for-reset"
            element={<OTPVerifyForRestPassword />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        {/* ========================================
            PROTECTED PROFILE ROUTES
            (Uses ProfileLayout instead of Layout)
        ======================================== */}
        <Route element={<PrivateRoute />}>
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/certificate" element={<Certificates />} />
            <Route path="/enrollment-history" element={<EnrollmentHistory />} />
            <Route path="/enrollment/:id" element={<EnrollmentCourse />} />
            <Route path="/preview" element={<DocPreview />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
