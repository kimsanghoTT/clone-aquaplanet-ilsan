import React, {useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./main/ilsan_main_fullpage.jsx";
import IlsanHeader from "./layout/header/ilsan_header.jsx";
import AsideBar from "./layout/aside_bar/ilsan_aside.jsx";
import Footer from "./layout/footer/ilsan_footer.jsx";
import AquaplanetIlsanFriends from "./friends/ilsan_friends.jsx";

const IlsanWrapper = () => {
  const [eventListOpen, setEventListOpen] = useState(false);

  const handleEventListOpen = () => {
    setEventListOpen(!eventListOpen);
  };

  return (
    <>
      <IlsanHeader />
      <AsideBar 
        eventListOpen={eventListOpen}
        handleEventListOpen={handleEventListOpen}
      />
      <Routes>
        <Route path="/" element={<Main eventListOpen={eventListOpen}/>} />
        <Route path="/aquaplanet/friends" element={<AquaplanetIlsanFriends/>}/>
      </Routes>
      <Footer />
    </>
  );
};
export default IlsanWrapper;
