import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setSendingOtp(true);

    try {
      // Call the forgot password API
      const response = await axios.post("/forgot-password", { email });

      // If OTP is sent successfully, show success and navigate to OTP verification page
      if (
        response.data.message ===
        "OTP sent to your email. Please verify to reset password."
      ) {
        toast.success("OTP sent successfully. Please check your email.");
        // Navigate to the OTP verification page
        navigate("/verify-for-reset");
      } else {
        // Handle case where response does not indicate success
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      // Handle error if API fails (e.g., account not found)
      if (error.response && error.response.data) {
        // Display the error message sent from the backend (e.g., account not found)
        toast.error(
          error.response.data.message || "Failed to send OTP. Please try again."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setSendingOtp(false);
    }
  };
  return {
    email,
    sendingOtp,
    setEmail,
    handleSubmit,
  };
}
