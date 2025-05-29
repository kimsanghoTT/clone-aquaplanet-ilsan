import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./userAuth/signup";
import AquaplanetHeader from "./layout/aquaplanet_header";
import Login from "./userAuth/login";

const AquaplanetWrapper = () => {

    return(
        <>
        <AquaplanetHeader/>
        <Routes>
            <Route path="/member/signup" element={<Signup/>}/>
            <Route path="/member/login" element={<Login/>}/>
        </Routes>
        </>
    )
}
export default AquaplanetWrapper;