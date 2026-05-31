/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import PropTypes from "prop-types";
import EventData from "./Components/EventData";
import AuthProvider from "./Components/AuthProvider";
import ForgotPassword from "./Components/UserAuth/ForgotPassword";
import api from "../lib/api/axios";
import useProfileData from "./Components/useProfileData";

export const DataContext = createContext();

export default function DataProcessing({ children }) {
  const { runningEvents, monthlyEvents, loadRunningEvents, hasMore, loading } =
    EventData();

  const { auth, setAuth } = AuthProvider();

  const { email, setEmail, handleSubmit, sendingOtp } = ForgotPassword(api);
  const {
    profile,
    updateProfileImage,
    setProfile,
    profileLoading,
    refetchProfile,
  } = useProfileData(auth);

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    setProfile(null);
  };

  return (
    <DataContext.Provider
      value={{
        api,
        auth,
        setAuth,
        logout,
        // Events
        runningEvents,
        monthlyEvents,
        loadRunningEvents,
        hasMore,
        loading,

        // Forgot Password
        email,
        setEmail,
        handleSubmit,
        sendingOtp,

        // Other data and functions can be added here as needed
        profile,
        updateProfileImage,
        setProfile,
        profileLoading,
        refetchProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

DataProcessing.propTypes = {
  children: PropTypes.node.isRequired,
};
