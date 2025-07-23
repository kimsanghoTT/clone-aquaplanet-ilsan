import React, { useState } from "react";
import { Switch } from "antd";
import "antd/dist/reset.css";
import CustomDropdown from "../../../common_sub_components/customDropdown";

const MarketingSection = () => {
    const [marketingModalOpen, setMarketingModalOpen] = useState(false);
    const [selectedMarketingVersion, setSelectedMarketingVersion] = useState("마케팅 활용 동의 v 1.0");
    const [agreeToMarketing, setAgreeToMarketing] = useState({
        marketing: false,
        sns: false,
        email: false,
    });
    const marketingOptions = ["마케팅 활용 동의 v 1.0"];


    const handleToAgree = (option) => {
        if (option === "marketing") {
            setAgreeToMarketing(prev => {
                const marketingState = !prev.marketing;
                if(!marketingState){
                    return{
                        marketing:!prev.marketing,
                        sns:false,
                        email:false
                    }
                }
                return{
                    marketing:!prev.marketing,
                    sns:!prev.sns,
                    email:!prev.email
                }
            });
        } 
        else {
            setAgreeToMarketing((value) => {
                const handleChildSwitch = {
                    ...value,
                    [option]: !value[option],
                };
                //sns나 email 둘 중하나라도 true가 되면 marketing도 true로 바꾸기
                const isSomeChildSwitchTrue = handleChildSwitch.sns || handleChildSwitch.email;
                handleChildSwitch.marketing = isSomeChildSwitchTrue;

                //객체 새 상태로 저장 지시
                return handleChildSwitch;
            });
        }
    };

    const handleModalOpen = () => {
        setMarketingModalOpen(!marketingModalOpen);
    };

    return (
        <>
            <form className="agreeForm">
                <div className="mypage-option-item">
                    <div className="label">
                        <span>마케팅 활용 동의</span>
                        <button type="button" className="marketing-terms-btn" onClick={handleModalOpen}>자세히 보기</button>
                    </div>
                    <div className="value">
                        <Switch
                        checked={agreeToMarketing.marketing}
                        onChange={() => handleToAgree("marketing")}
                        style={{ transform: "scale(1.4)" }}
                        />
                    </div>
                </div>
                <div className="mypage-option-item">
                    <div className="label">
                        <span>└ SMS/카카오톡 수신 동의</span>
                    </div>
                    <div className="value">
                        <Switch
                        checked={agreeToMarketing.sns}
                        onChange={() => handleToAgree("sns")}
                        style={{ transform: "scale(1.4)" }}
                        />
                    </div>
                </div>
                <div className="mypage-option-item">
                    <div className="label">
                        <span>└ 이메일 수신 동의</span>
                    </div>
                    <div className="value">
                        <Switch
                        checked={agreeToMarketing.email}
                        onChange={() => handleToAgree("email")}
                        style={{ transform: "scale(1.3)" }}
                        />
                    </div>
                </div>
            </form>
            <div className={`marketing-modal-wrapper ${marketingModalOpen ? "open" : ""}`}>
                <div className="marketing-modal-container">
                    <button
                        className="modal-close-btn"
                        type="button"
                        onClick={handleModalOpen}
                    ></button>
                <div className="modal-marketing-content">
                    <h2>마케팅 활용 동의 [선택]</h2>
                    <CustomDropdown
                        options={marketingOptions}
                        selectedValue={selectedMarketingVersion}
                        displayClassName="marketing-version-display"
                        selectorClassName="marketing-version-selector"
                        optionClassName="marketing-version-item"
                        onSelect={setSelectedMarketingVersion}
                    />
                    <hr />
                    <div className="marketing-detail">
                        <div className="marking-paragraph">
                            <p><strong>수집하려는 개인정보의 항목</strong></p>
                            <p>- 이메일 주소, 핸드폰번호</p>
                        </div>
                        <div className="marking-paragraph">
                            <p><strong>개인정보의 수집ㆍ이용 목적</strong></p>
                            <p>- 새로운 정보와 다양한 이벤트/프로모션 등의 최신 정보 안내</p>
                        </div>
                        <div className="marking-paragraph">
                            <p><strong>개인정보의 보유 및 이용기간</strong></p>
                            <p>- 동의철회 또는 회원 탈회 시까지</p>
                        </div>
                        <div className="marking-paragraph">
                            <p>* 마케팅 정보 활용에 대하여 귀하는 동의하지 않을 수 있습니다.</p>
                            <p>단, 동의 거부 시 신상품 및 이벤트 정보 등 최신정보 안내 등의 서비스가 제한됩니다.</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default MarketingSection;