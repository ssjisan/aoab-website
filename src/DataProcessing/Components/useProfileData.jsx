import { useEffect, useState, useCallback } from "react";
import api from "../../lib/api/axios";
import toast from "react-hot-toast";

export default function useProfileData() {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // ---------------------------------------
  // FETCH PROFILE (REUSABLE)
  // ---------------------------------------
  const fetchProfile = useCallback(async () => {
    try {
      setProfileLoading(true);

      const { data } = await api.get("/my-profile-data");

      setProfile({ ...data });
    } catch (err) {
      toast.error("Error loading profile");
    } finally {
      setProfileLoading(false);
    }
  }, []);

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
    refetchProfile: fetchProfile, // 👈 IMPORTANT
    updateProfileImage,
  };
}
