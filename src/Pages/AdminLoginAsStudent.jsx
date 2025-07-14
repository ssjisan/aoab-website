import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLoginAsStudent() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const password = urlParams.get("password");

    const validateAdmin = async () => {
      try {
        const res = await axios.post("/api/admin/validate", { email, password });
        if (res.data.success) {
          setAuthorized(true);
        } else {
          alert("Unauthorized access");
          navigate("/not-found"); // or home page
        }
      } catch (err) {
        console.error("Validation error", err);
        alert("Unauthorized");
        navigate("/");
      }
    };

    validateAdmin();
  }, [navigate]);

  const handleStudentLogin = async () => {
    if (!studentEmail) return alert("Enter student email");

    try {
      setLoading(true);
      const res = await axios.post("/api/admin/login-as", { email: studentEmail });
      localStorage.setItem("token", res.data.token);
      navigate("/student-dashboard");
    } catch (err) {
      alert("Failed to login as student");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) return <p>Validating admin access...</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Admin Student Access</h2>
      <input
        type="email"
        placeholder="Enter student email"
        value={studentEmail}
        onChange={(e) => setStudentEmail(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleStudentLogin} disabled={loading} style={{ padding: "10px 20px" }}>
        {loading ? "Logging in..." : "Login as Student"}
      </button>
    </div>
  );
}
