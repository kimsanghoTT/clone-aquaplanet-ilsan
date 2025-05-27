import React from "react";
import "../../../css/aquaplanet/aquaplanet_header.css";

const AquaplanetHeader = () => {

    return(
        <header className="aquaplanet-header">
            <h1><a href="/"><span className="aquaplanet-logo"></span></a></h1>
            <div className="aquaplanet-header-function">
                <div className="function-join">
                    <a href="/"><span>로그인</span></a>
                    <a href="/"><span>회원가입</span></a>
                </div>
                <div className="function-util">
                    <div className="location-selector">
                        <button>지역</button>
                        <form>
                            <label></label>
                            <input/>
                            <label></label>
                            <input/>
                            <label></label>
                            <input/>
                            <label></label>
                            <input/>
                            <button>적용</button>
                        </form>
                    </div>
                    <a href="/"><span>아쿠아플라넷 홈페이지</span></a>
                    <button className="aquaplanet-header-menu-btn"></button>
                </div>
            </div>
        </header>
    )
}
export default AquaplanetHeader;