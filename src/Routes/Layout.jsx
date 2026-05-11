import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
