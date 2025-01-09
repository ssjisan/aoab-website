import LocationMap from "../Components/AboutUs/LocationMap";
import EducationTrainingView from "../Components/EducationTraining/EducationTrainingView";
import Footer from "../Components/Footer/Footer";
import UpcomingEvent from "../Components/Home/UpcomingEvent";
import Navbar from "../Layout/Navbar/Navbar";

export default function EducationTraining() {
  return (
    <>
      <Navbar />
      <UpcomingEvent />
      <EducationTrainingView />
      <LocationMap />
      <Footer />
    </>
  );
}
