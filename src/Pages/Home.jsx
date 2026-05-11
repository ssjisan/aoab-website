import AboutUs from "../Components/Home/AboutUs";
import FaQ from "../Components/Home/FaQ";
import HeroSection from "../Components/Home/HeroSection";
import Matrix from "../Components/Home/Matrix";
// import OurPillars from "../Components/Home/OurPillars";
import UpcomingEvent from "../Components/Home/UpcomingEvent";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      {/* <OurPillars /> */}
      <UpcomingEvent />
      <Matrix />
      <FaQ />
    </>
  );
}
