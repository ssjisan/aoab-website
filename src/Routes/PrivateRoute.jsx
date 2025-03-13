import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataProcessing/DataProcessing";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function PrivateRoute() {
  const { auth } = useContext(DataContext);
  const [isChecking, setIsChecking] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get("/auth-check");
        setIsUserLoggedIn(data?.ok);
      } catch (error) {
        setIsUserLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setIsChecking(false);
      setIsUserLoggedIn(false);
    }
  }, [auth?.token]);

  // 🔹 Redirect immediately if not logged in
  if (!auth?.token && !isChecking) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔹 Show loading only while checking the token
  if (isChecking) return <Loading />;

  return <Outlet />;
}
