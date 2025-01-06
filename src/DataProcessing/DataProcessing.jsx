import { createContext } from "react";
import PropTypes from "prop-types";
import useEventData from "./Components/useEventData";
import useExecutiveBodyData from "./Components/useExecutiveBodyData";

export const DataContext = createContext();

export default function DataProcessing({ children }) {
  const { events, isModalOpen, handleCloseModal, lastEvent, loading } =
    useEventData();
  const { committees, executiveLoading, executiveError } = useExecutiveBodyData();
  return (
    <DataContext.Provider
      value={{
        // Events
        events,
        lastEvent,
        isModalOpen,
        loading,
        handleCloseModal,
        committees,
        executiveLoading,
        executiveError,
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
