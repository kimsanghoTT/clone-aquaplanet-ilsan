import React from "react";
import { values } from "../data/data";

const PlanetContent02 = () => {

    return (
        <div id="planet02" className="planet-content-box content-02">
            <div className="center-content">
                <div className="content-title">
                    <h2 className="value-title">미션과 가치</h2>
                </div>
                <div className="mission-box">
                    <div className="text-box">
                        <p>우리의 <span>미션</span>은</p>
                        <p><span>아쿠아플라넷 일산</span>은 해양생물 보존의 가치를 공유하며,</p>
                        <p><span>인간과 자연이 공생</span>하며 느낄 수 있는 최고의 즐거움을 제공합니다.</p>
                    </div>
                </div>
                <div className="value-box">
                    <div className="value-title">
                        <p>우리의 <span>가치</span></p>
                    </div>
                    <div className="value-info">
                        <p>
                        아쿠아플라넷의 가치는 일상에서 쉽게 접할 수 없는 다양한 해양생태계의 모습을 보여줌으로써 “<span>해양문화의 가치</span>”를 전파하고, <br />
                        “<span>생태계 보존</span>”이라는 명제를 대중에게 널리 알리고자 하는 것입니다.
                        </p>
                        <p>
                            늘 새로운 감동으로 고객님들의 마음에 보답하는 아쿠아플라넷 일산이 될 수 있도록 최선을 다하겠습니다. <br />
                            세계의 바다를 담은 “아쿠아플라넷 일산”에서 바다의 경외감을 넘어, 생명 보존에 대한 필요성을 느껴보시길 바랍니다.
                        </p>
                        <ul>
                            {values.length > 0 && values.map((value, index) => (
                                <li key={index} style={{background:`url(${value.image}) no-repeat center top`}}>
                                    <p>{value.motto_kr}</p>
                                    <p>{value.motto_en}</p>
                                    <p>{value.text1}</p>
                                    <p>{value.text2}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlanetContent02