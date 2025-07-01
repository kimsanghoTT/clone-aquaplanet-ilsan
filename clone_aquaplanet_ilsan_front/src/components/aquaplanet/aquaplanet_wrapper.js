import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AquaplanetHeader from "./layout/aquaplanet_header"
import Signup from "./userService/aquaplaent_signup";
import Login from "./userService/aquaplanet_login";
import MyPage from "./userService/mypage/aquaplanet_mypage_setting";
import MyPageAccount from "./userService/mypage/aquaplanet_mypage_account"
import AccountCertification from "./userService/mypage/aquaplanet_mypage_certification";
import MainMall from "./main_mall/aquaplanet_main";
import AquaplanetItemDetail from "./main_mall/ticket_reservation/aquaplanet_item_detail";
import AquaplanetReservation from "./main_mall/ticket_reservation/aquaplanet_item_reservation";
import SuccessOrder from "./main_mall/ticket_reservation/aquaplanet_order_success";
import MyTicketList from "./userService/aquaplanet_my_ticket";
import MyPurchaseList from "./userService/aquaplanet_my_purchase_list";

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
            <Route path="/mall/item_detail/:id/order/:memberNo/orderDone" element={<SuccessOrder/>}/>
            <Route path="/member/myTicket" element={<MyTicketList/>}/>
            <Route path="/member/myPurchaseList" element={<MyPurchaseList/>}/>
        </Routes>
        </>
    )
}
export default AquaplanetWrapper;