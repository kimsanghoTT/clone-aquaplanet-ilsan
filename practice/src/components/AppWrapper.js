import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "../css/index.css";
import Header from "./layout/header";
import Main from "./main/main_fullpage";
import AsideBar from "./layout/aside";
import Footer from "./layout/footer";

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
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppWrapper;
