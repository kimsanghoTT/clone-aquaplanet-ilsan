import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./userService/signup";
import AquaplanetHeader from "./layout/aquaplanet_header";
import Login from "./userService/login";
import MyPage from "./userService/mypage";
import MyPageAccount from "./userService/mypage_account";

const AquaplanetWrapper = () => {

    return(
        <>
        <AquaplanetHeader/>
        <Routes>
            <Route path="/member/signup" element={<Signup/>}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/mypage" element={<MyPage/>}/>
            <Route path="/member/mypage/updateUserInfo" element={<MyPageAccount/>}/>
        </Routes>
        </>
    )
}
export default AquaplanetWrapper;