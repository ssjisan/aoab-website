import { useEffect, useState } from "react";

// Helper function to check if token is expired
const isTokenExpired = (exp) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp format (seconds)
  return exp < currentTime; // Return true if token is expired
};

export default function AuthProvider() {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      const { token, user } = parsedData;

      try {
        // Decode the token to extract `exp`
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        const { exp } = decodedToken; // Extract expiry timestamp

        // Check if the token has expired
        if (isTokenExpired(exp)) {
          // Token expired, remove auth data from localStorage and update state
          localStorage.removeItem("auth");
          setAuth({ user: null, token: "" });
        } else {
          // Token is valid, set the auth state
          setAuth({
            token,
            user,
          });
        }
      } catch (error) {
        // Handle any errors in decoding or processing the token
        console.error("Error decoding token:", error);
        localStorage.removeItem("auth");
        setAuth({ user: null, token: "" });
      }
    }
  }, []); // Run this effect once on initial render

  return {
    auth,
    setAuth,
  };
}
