import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AquaplanetHeader from "./layout/header/aquaplanet_header"
import Signup from "./userService/signup/aquaplaent_signup.jsx";
import Login from "./userService/login/aquaplanet_login.jsx";
import MyPageSetting from "./userService/my_page/pages/settings/aquaplanet_mypage_setting.jsx";
import MyPageAccount from "./userService/my_page/pages/account/aquaplanet_mypage_account.jsx"
import AccountCertification from "./userService/my_page/pages/certification/aquaplanet_mypage_certification.jsx";
import MainMall from "./main/mall/aquaplanet_main.jsx";
import AquaplanetItemDetail from "./main/ticket_reservation/pages/item_detail/aquaplanet_item_detail.jsx";
import AquaplanetReservation from "./main/ticket_reservation/pages/item_reservation/aquaplanet_item_reservation.jsx";
import SuccessOrder from "./main/ticket_reservation/pages/order_success/aquaplanet_order_success.jsx";
import MyTicketList from "./userService/my_ticket/aquaplanet_my_ticket.jsx";
import MyPurchaseList from "./userService/my_purchase_list/aquaplanet_my_purchase_list.jsx";
import UpdateProfile from "./userService/my_page/pages/account_update/update_profile/aquaplanet_mypage_account_update_profile.jsx";
import UpdatePassword from "./userService/my_page/pages/account_update/update_password/aquaplanet_mypage_account_update_pw.jsx";
import DeleteAccount from "./userService/my_page/pages/account_update/delete_account/aquaplanet_mypage_account_delete.jsx";

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
            <Route path="/member/mypage/setting" element={<MyPageSetting/>}/>
            <Route path="/member/mypage/certification" element={<AccountCertification/>}/>
            <Route path="/member/mypage/userInfo" element={<MyPageAccount/>}/>
            <Route path="/member/mypage/updateProfile" element={<UpdateProfile/>}/>
            <Route path="/member/mypage/updatePassword" element={<UpdatePassword/>}/>
            <Route path="/member/mypage/deleteAccount" element={<DeleteAccount/>}/>
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