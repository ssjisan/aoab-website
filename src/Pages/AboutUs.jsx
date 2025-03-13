import AboutHeading from "../Components/AboutUs/AboutHeading";
import LocationMap from "../Components/AboutUs/LocationMap";
import MissionVision from "../Components/AboutUs/MissionVision";
import Footer from "../Components/Footer/Footer";
import FaQ from "../Components/Home/FaQ";
import Matrix from "../Components/Home/Matrix";
import Navbar from "../Layout/Navbar/Navbar";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <AboutHeading />
      <Matrix />
      <MissionVision />
      <FaQ />
      <LocationMap />
      <Footer />
    </>
  );
}
