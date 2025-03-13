import { BrowserRouter } from "react-router-dom";
import Theme from "./Components/Theme/index";
import DataProcessing from "./DataProcessing/DataProcessing";
import MainRouter from "./Routes/MainRouter";
function App() {
  return (
    <BrowserRouter>
      <DataProcessing>
        <Theme>
          <MainRouter />
        </Theme>
      </DataProcessing>
    </BrowserRouter>
  );
}

export default App;
