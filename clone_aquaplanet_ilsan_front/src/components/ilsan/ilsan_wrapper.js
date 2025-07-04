import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./main/pages/ilsan_main_fullpage";
import IlsanHeader from "./layout/Header/ilsan_header";
import AsideBar from "./layout/AsideBar/ilsan_aside";
import Footer from "./layout/Footer/ilsan_footer";

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
