import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./userAuth/signup";
import AquaplanetHeader from "./layout/aquaplanet_header";

const AquaplanetWrapper = () => {

    return(
        <>
        <AquaplanetHeader/>
        <Routes>
            <Route path="/member/signup" element={<Signup/>}/>
        </Routes>
        </>
    )
}
export default AquaplanetWrapper;