import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "../css/index.css";
import Header from "./layout/header";
import Main from "./main/main_fullpage";
import AsideBar from "./layout/aside";
import Footer from "./layout/footer";
import Signup from "./userAuth/signup";

const AppWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [location]);
  return (
    <>
      <Header />
      <AsideBar />
      <Routes>
        <Route path="/" element={<Navigate to="/aquaplanet/ilsan" replace />} />
        <Route path="/aquaplanet/ilsan" element={<Main />} />
        <Route path="/aquaplanet/signup" element={<Signup/>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default AppWrapper;
