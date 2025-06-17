import React, { useContext, useEffect, useState } from "react";
import "../../../css/aquaplanet/mypage.css";
import LoginContext from "../../LoginContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import "antd/dist/reset.css";

const MyPageAccount = () => {
  const { loginMember } = useContext(LoginContext);
  const [pwVision, setPwVision] = useState(false);
  const [certification, setCertification] = useState("");
  const [step, setStep] = useState(1);
  const [marketingModalOpen, setMarketingModalOpen] = useState(false);
  const [selectedMarketingVersion, setSelectedMarketingVersion] =
    useState("마케팅 활용 동의 v 1.0");
  const [marketingVersionListOpen, setMarketingVersionListOpen] =
    useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState({
    marketing: false,
    sns: false,
    email: false,
  });
  const errMsg = {
    PW_MATCH: "비밀번호가 일치하지 않습니다.",
  };
  const navigate = useNavigate();
  const formattedPhone = loginMember?.memberPhone
    ? `${loginMember.memberPhone.substring(0, 3)}-${loginMember.memberPhone.substring(3, 7)}-${loginMember.memberPhone.substring(7)}`
    : "";

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const userCertification = () => {
    if (loginMember.memberPw === certification) {
      setStep(2);
    } else {
      alert(errMsg.PW_MATCH);
    }
  };

  const backToSetting = () => {
    navigate("/aquaplanet/member/mypage");
  };

  const handleToAgree = (option) => {
    if (option === "marketing") {
      setAgreeToMarketing({
        marketing: !agreeToMarketing.marketing,
        sns: !agreeToMarketing.sns,
        email: !agreeToMarketing.email,
      });
    } else {
      setAgreeToMarketing((value) => {
        const handleChildSwitch = {
          ...value,
          [option]: !value[option],
        };
        const isSomeChildSwitchTrue =
          handleChildSwitch.sns || handleChildSwitch.email;
        handleChildSwitch.marketing = isSomeChildSwitchTrue;

        //객체 새 상태로 저장 지시
        return handleChildSwitch;
      });
    }
  };

  const handleModalOpen = () => {
    setMarketingModalOpen(!marketingModalOpen);
  };

  const handleTermsVersionList = () => {
    setMarketingVersionListOpen(!marketingVersionListOpen);
  };

  const termsVersionSelection = (version) => {
    setSelectedMarketingVersion(version);
    setMarketingVersionListOpen(false);
  };

  if (!loginMember) {
    return;
  }

  return (
    <section className="member-mypage">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
        {step === 1 && (
          <div className="member-mypage-box">
            <div className="member-mypage-title">
              <p>비밀번호 확인</p>
              <p style={{ marginBottom: "35px" }}>
                고객정보 확인을 위해 비밀번호를 입력해 주세요.
              </p>
            </div>
            <div className="member-mypage-content">
              <div className="form-item">
                <label htmlFor="newPw" style={{ fontSize: "14px" }}>
                  비밀번호
                </label>
                <button
                  type="button"
                  className={`pw-vision ${pwVision ? "on" : ""}`}
                  onClick={pwVisionOn}
                  style={{ top: "30px" }}
                >
                  <span className="ico1"></span>
                </button>
                <input
                  id="newPw"
                  type={pwVision ? "text" : "password"}
                  required
                  placeholder="비밀번호를 입력해 주세요"
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                />
              </div>
              <div className="mypage-update-btn-area">
                <button onClick={userCertification}>확인</button>
                <button onClick={backToSetting}>취소</button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="member-mypage-box">
            <div className="member-mypage-title">
              <p>내 정보</p>
              <p style={{ marginBottom: "25px" }}>
                안녕하세요! <em>{loginMember.memberName}</em>님 아쿠아플라넷에{" "}
                <br />
                오신것을 환영합니다.
              </p>
            </div>
            <div className="member-mypage-content">
              <button className="logout-btn">로그아웃</button>
              <ul className="user-profile-list">
                <li className="user-profile-item">
                  <span className="profile-label">이름</span>
                  <span className="profile-value">
                    {loginMember.memberName}
                  </span>
                </li>
                <li className="user-profile-item">
                  <span className="profile-label">연락처</span>
                  <span className="profile-value">{formattedPhone}</span>
                </li>
                <li className="user-profile-item">
                  <span className="profile-label">생년월일</span>
                  <span className="profile-value">
                    {loginMember?.memberBirth || "-"}
                  </span>
                </li>
                <li className="user-profile-item">
                  <span className="profile-label">이메일</span>
                  <span className="profile-value">
                    {loginMember?.memberSubEmail || "-"}
                  </span>
                </li>
                <li className="user-profile-item">
                  <span className="profile-label">거주지역</span>
                  <span className="profile-value">
                    {loginMember?.memberRegionCity || "-"} &nbsp;
                    {loginMember?.memberRegionDistrict || "-"}
                  </span>
                </li>
              </ul>
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
              <div
                className={`marketing-modal-wrapper ${marketingModalOpen ? "open" : ""}`}
              >
                <div className="marketing-modal-container">
                  <button
                    className="modal-close-btn"
                    type="button"
                    onClick={handleModalOpen}
                  ></button>
                  <div className="modal-marketing-content">
                    <h2>마케팅 활용 동의 [선택]</h2>
                    <span
                      className={`marketing-version-display ${marketingVersionListOpen ? "on" : ""}`}
                      onClick={handleTermsVersionList}
                    >
                      {selectedMarketingVersion}
                    </span>
                    <select defaultValue="마케팅 활용 동의 v 1.0">
                      <option>마케팅 활용 동의 [선택]</option>
                    </select>
                    <ul
                      className={`marketing-version-selector ${marketingVersionListOpen ? "on" : ""}`}
                    >
                      <li
                        value={"마케팅 활용 동의 v 1.0"}
                        className={`marketing-version-item ${selectedMarketingVersion === "마케팅 활용 동의 v 1.0" ? "selected" : ""}`}
                        onClick={() => termsVersionSelection("마케팅 활용 동의 v 1.0")}
                      >
                        마케팅 활용 동의 v 1.0
                      </li>
                    </ul>
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
              <div className="mypage-util-btn-area">
                <button onClick={userCertification}>내 정보 수정하기</button>
                <button onClick={backToSetting}>비밀번호 변경하기</button>
                <button onClick={backToSetting}>탈퇴하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default MyPageAccount;
