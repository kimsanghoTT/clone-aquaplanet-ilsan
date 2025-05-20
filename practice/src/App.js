import React from "react";
import Header from "./components/layout/header";
import Main from "./components/main/main_fullpage";
import './css/index.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </Router>
  );
}

export default App;
