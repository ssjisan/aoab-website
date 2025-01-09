import { BrowserRouter } from "react-router-dom";
import Theme from "./Components/Theme/index";
import MainRouter from "./Components/MainRouter";
import DataProcessing from "./DataProcessing/DataProcessing";
function App() {
  return (
    <DataProcessing>
    <Theme>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Theme>
    </DataProcessing>
  );
}

export default App;
