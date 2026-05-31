import { useEffect, useState, useCallback } from "react";
import api from "../../lib/api/axios";
import toast from "react-hot-toast";

export default function useProfileData(auth) {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // ---------------------------------------
  // FETCH PROFILE (REUSABLE)
  // ---------------------------------------
  const fetchProfile = useCallback(async () => {
    if (!auth?.token) {
      setProfile(null);
      return;
    }

    try {
      setProfileLoading(true);
      const { data } = await api.get("/my-profile-data");
      setProfile(data);
    } catch (err) {
      setProfile(null);

      if (err?.response?.status !== 401) {
        toast.error("Error loading profile");
      }
    } finally {
      setProfileLoading(false);
    }
  }, [auth?.token]);

  // ---------------------------------------
  // INITIAL LOAD
  // ---------------------------------------
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ---------------------------------------
  // UPDATE PROFILE IMAGE ONLY
  // ---------------------------------------
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
    setProfile,
    profileLoading,
    refetchProfile: fetchProfile,
    updateProfileImage,
  };
}
