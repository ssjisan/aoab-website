/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import PropTypes from "prop-types";
import EventData from "./Components/EventData";
import axios from "axios";
import AuthProvider from "./Components/AuthProvider";
import ForgotPassword from "./Components/UserAuth/ForgotPassword";
export const DataContext = createContext();

export default function DataProcessing({ children }) {
  const { runningEvents, monthlyEvents, loadRunningEvents, hasMore, loading } =
    EventData();
  const { auth, setAuth } = AuthProvider();
  const { email, setEmail, handleSubmit, sendingOtp } = ForgotPassword();
  // *************************************************** Axios Configuration *********************************************************** //
  // eslint-disable-next-line
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_API;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <DataContext.Provider
      value={{
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
// Prop types validation
DataProcessing.propTypes = {
  children: PropTypes.node.isRequired,
};
