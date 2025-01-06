import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ClinicalResearch from "../Pages/ClinicalResearch";
import Videos from "../Pages/Videos";
import OnlineLearning from "../Pages/OnlineLearning";

export default function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clinical-research" element={<ClinicalResearch />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/online-learning" element={<OnlineLearning />} />
      </Routes>
    </>
  );
}
