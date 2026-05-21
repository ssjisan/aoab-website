import { useEffect, useState } from "react";
import api from "../../lib/api/axios";
import toast from "react-hot-toast";

export default function useProfileData() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { data } = await api.get("/my-profile-data");
        setProfile(data);
      } catch (err) {
        toast.error("Error loading profile:", err);
      }
    };

    loadProfileData();
  }, []);

  const updateProfileImage = (url) => {
    setProfile((prev) => ({
      ...prev,
      picture: {
        url: `${url}?t=${Date.now()}`,
      },
    }));
  };

  return {
    profile,
    updateProfileImage,
  };
}
