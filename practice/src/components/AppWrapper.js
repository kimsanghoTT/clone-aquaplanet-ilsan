import React, { useEffect } from "react";
import Header from "./layout/header";
import Main from "./main/main_fullpage";
import "../css/index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import AsideBar from "./layout/aside";

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/"){
        document.body.style.overflow = "hidden";
    }
    else{
        document.body.style.overflow = "auto";
    }
  },[location])
  return (
    <>
      <Header />
      <AsideBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
