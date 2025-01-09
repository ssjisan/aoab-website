import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ClinicalResearch from "../Pages/ClinicalResearch";
import Videos from "../Pages/Videos";
import OnlineLearning from "../Pages/OnlineLearning";
import Login from "../Pages/Login";
import AboutUs from "../Pages/AboutUs";
import EducationTraining from "../Pages/EducationTraining";

export default function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clinical-research" element={<ClinicalResearch />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/online-learning" element={<OnlineLearning />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/educations&training/aoa-bangladesh" element={<EducationTraining/>}/>
      </Routes>
    </>
  );
}
