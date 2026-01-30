import { BrowserRouter, Route, Routes } from "react-router-dom";
import BodyContent from "./components/BodyContent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<BodyContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
