import { createContext } from "react";
import PropTypes from "prop-types";
import useEventData from "./Components/useEventData";

export const DataContext = createContext();

export default function DataProcessing({ children }) {
  const { runningEvents, monthlyEvents, loadRunningEvents, hasMore, loading } =
    useEventData();
  return (
    <DataContext.Provider
      value={{
        // Events
        runningEvents,
        monthlyEvents,
        loadRunningEvents,
        hasMore,
        loading,
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
