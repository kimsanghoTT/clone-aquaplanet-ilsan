import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./main/main_fullpage";
import IlsanHeader from "./layout/ilsan_header";
import AsideBar from "./layout/aside";
import Footer from "./layout/footer";

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
