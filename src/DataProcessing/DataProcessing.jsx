/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import PropTypes from "prop-types";
import EventData from "./Components/EventData";
import AuthProvider from "./Components/AuthProvider";
import ForgotPassword from "./Components/UserAuth/ForgotPassword";
import api from "../lib/api/axios";

export const DataContext = createContext();

export default function DataProcessing({ children }) {
  const { runningEvents, monthlyEvents, loadRunningEvents, hasMore, loading } =
    EventData();

  const { auth, setAuth } = AuthProvider();

  const { email, setEmail, handleSubmit, sendingOtp } = ForgotPassword(api);

  return (
    <DataContext.Provider
      value={{
        api, // make axios instance available everywhere
        auth,
        setAuth,

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

DataProcessing.propTypes = {
  children: PropTypes.node.isRequired,
};
