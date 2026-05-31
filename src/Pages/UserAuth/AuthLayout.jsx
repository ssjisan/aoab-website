import AuthNavbar from "../../Layout/AuthNavbar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <AuthNavbar />
      <Outlet />
    </div>
  );
}
