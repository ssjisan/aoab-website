import { Route, Routes } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../Pages/UserAuth/ForgotPassword";
import OTPVerify from "../Pages/UserAuth/OTPVerify";
import OTPVerifyForRestPassword from "../Pages/UserAuth/OTPVerifyForRestPassword";
import ResetPassword from "../Pages/UserAuth/ResetPassword";
import Profile from "../Pages/StudentProfile/Profile";
import Certificates from "../Pages/StudentProfile/Certificates";
import EnrollmentHistory from "../Pages/StudentProfile/EnrollmentHistory";
import Password from "../Pages/StudentProfile/password";
import Registration from "../Pages/UserAuth/Registration";

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
        <Route path="/registration" element={<Registration />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/verify-for-reset"
          element={<OTPVerifyForRestPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/certificate" element={<Certificates />} />
          <Route path="/enrollment-history" element={<EnrollmentHistory />} />
          <Route path="/videos" element={<Videos />} />
        </Route>
      </Routes>
    </>
  );
}
