import { useState } from "react";

const isTokenExpired = (exp) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};

export default function AuthProvider() {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");

    if (!data) {
      return {
        user: null,
        token: "",
      };
    }

    try {
      const parsedData = JSON.parse(data);
      const { token, user } = parsedData;

      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      if (isTokenExpired(decodedToken.exp)) {
        localStorage.removeItem("auth");
        return {
          user: null,
          token: "",
        };
      }

      return {
        user,
        token,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("auth");

      return {
        user: null,
        token: "",
      };
    }
  });

  return {
    auth,
    setAuth,
  };
}
