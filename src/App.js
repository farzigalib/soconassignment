import { Route, Routes } from "react-router-dom";
import "./App.css";
import DetailedViewScreen from "./screens/DetailedViewScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/detailed-view/:id" element={<DetailedViewScreen />} />
    </Routes>
  );
}

export default App;
