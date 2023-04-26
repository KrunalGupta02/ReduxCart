import "./App.css";
import { Header } from "./Components/Header";
import { CardDetails } from "./Components/CardDetails";
import { Cards } from "./Components/Cards";
import Cancel from "./Components/cancel";
import Success from "./Components/success";

import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetails />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;
