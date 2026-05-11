import AboutHeading from "../Components/AboutUs/AboutHeading";
import LocationMap from "../Components/AboutUs/LocationMap";
import MissionVision from "../Components/AboutUs/MissionVision";
import FaQ from "../Components/Home/FaQ";
import Matrix from "../Components/Home/Matrix";

export default function AboutUs() {
  return (
    <>
      <AboutHeading />
      <Matrix />
      <MissionVision />
      <FaQ />
      <LocationMap />
    </>
  );
}
