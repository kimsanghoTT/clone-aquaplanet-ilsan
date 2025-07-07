import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./main/sections/ilsan_main_fullpage";
import IlsanHeader from "./layout/header/ilsan_header";
import AsideBar from "./layout/aside_bar/ilsan_aside";
import Footer from "./layout/footer/ilsan_footer";

const IlsanWrapper = () => {
  return (
    <>
      <IlsanHeader />
      <AsideBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </>
  );
};
export default IlsanWrapper;
