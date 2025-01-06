import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useExecutiveBodyData() {
  const [committees, setCommittees] = useState([]);
  const [executiveLoading, setExecutiveLoading] = useState(true);
  const [executiveError, setExecutiveError] = useState(false);

  useEffect(() => {
    loadCommittees();
  }, []);

  const loadCommittees = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/executive-committee`
      );

      setCommittees([data[0]]);
      setExecutiveLoading(false);
      setExecutiveError(false);
    } catch (executiveError) {
      toast.error("Failed to load committees");
      setExecutiveLoading(false);
      setExecutiveError(true);
    }
  };
  return {
    committees,
    executiveLoading,
    executiveError,
  };
}
