import "./App.css";
import { Header } from "./Components/Header";
import { CardDetails } from "./Components/CardDetails";
import { Cards } from "./Components/Cards";

import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetails />} />
      </Routes>
    </div>
  );
}

export default App;
