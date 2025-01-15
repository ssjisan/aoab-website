import Footer from "../Components/Footer/Footer";
import AboutUs from "../Components/Home/AboutUs";
import FaQ from "../Components/Home/FaQ";
import HeroSection from "../Components/Home/HeroSection";
import Matrix from "../Components/Home/Matrix";
// import OurPillars from "../Components/Home/OurPillars";
import UpcomingEvent from "../Components/Home/UpcomingEvent";
import Navbar from "../Layout/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      {/* <OurPillars /> */}
      <UpcomingEvent />
      <Matrix />
      <FaQ/>
      <Footer />
    </>
  );
}
