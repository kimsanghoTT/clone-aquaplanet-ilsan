import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./userService/signup";
import AquaplanetHeader from "./layout/aquaplanet_header";
import Login from "./userService/login";
import MyPage from "./userService/mypage/mypage_setting";
import MyPageAccount from "./userService/mypage/mypage_account";
import AccountCertification from "./userService/mypage/mypage_certification";
import MainMall from "./main_mall/aquaplanet_main";
import AquaplanetItemDetail from "./main_mall/aquaplanet_item_detail";
import AquaplanetReservation from "./main_mall/ticket_reservation/aquaplanet_item_reservation";

const AquaplanetWrapper = () => {
    const [selectedPreferredBranch, setSelectedPreferredBranch] = useState({
        여수: true,
        제주: true,
        일산: true,
        광교: true,
    });

    return(
        <>
        <AquaplanetHeader 
        selectedPreferredBranch={selectedPreferredBranch} 
        setSelectedPreferredBranch={setSelectedPreferredBranch}
        />
        <Routes>
            <Route path="/member/signup" element={<Signup/>}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/mypage/setting" element={<MyPage/>}/>
            <Route path="/member/mypage/updateUserInfo" element={<MyPageAccount/>}/>
            <Route path="/member/mypage/certification" element={<AccountCertification/>}/>
            <Route path="/mall" element={<MainMall selectedPreferredBranch={selectedPreferredBranch}/>}/>
            <Route path="/mall/item_detail/:id" element={<AquaplanetItemDetail />} />
            <Route path="/mall/item_detail/:id/order/:memberNo" element={<AquaplanetReservation/>}/>
        </Routes>
        </>
    )
}
export default AquaplanetWrapper;