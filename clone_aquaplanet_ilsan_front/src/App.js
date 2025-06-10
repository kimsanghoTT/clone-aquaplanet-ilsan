import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import IlsanWrapper from "./components/ilsan/ilsan_wrapper";
import AquaplanetWrapper from "./components/aquaplanet/aquaplanet_wrapper";
import LoginContext from "./components/LoginContext";
import TitleChanger from "./components/title_changer";
import "./css/index.css";

function App() {
  const [loginMember, setLoginMember] = useState(null);

  useEffect(() => {
    if(loginMember){
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  },[loginMember]);

  useEffect(() => {
    const savedMemberLogin = localStorage.getItem("loginMember");
    if(savedMemberLogin){
      setLoginMember(JSON.parse(savedMemberLogin));
    }
  },[])

  return (
    <LoginContext.Provider value={{loginMember, setLoginMember}}>
    <Router>
      <TitleChanger/>
      <Routes>
        <Route path="/" element={<Navigate to="/aquaplanet/ilsan" replace />} />
        <Route path="/aquaplanet/ilsan/*" element={<IlsanWrapper/>}/>
        <Route path="/aquaplanet/*" element={<AquaplanetWrapper/>}/>
      </Routes>
    </Router>
    </LoginContext.Provider>
  );
}

export default App;
