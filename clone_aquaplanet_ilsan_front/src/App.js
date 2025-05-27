import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./css/index.css";
import IlsanWrapper from "./components/ilsan/ilsan_wrapper";
import AquaplanetWrapper from "./components/aquaplanet/aquaplanet_wrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/aquaplanet/ilsan" replace />} />
        <Route path="/aquaplanet/ilsan/*" element={<IlsanWrapper/>}/>
        <Route path="/aquaplanet/*" element={<AquaplanetWrapper/>}/>
      </Routes>
    </Router>
  );
}

export default App;
