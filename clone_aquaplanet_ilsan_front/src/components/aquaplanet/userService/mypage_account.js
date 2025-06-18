import React, { useContext, useEffect, useState } from "react";
import '../../../css/aquaplanet/mypage_account.css';
import LoginContext from "../../LoginContext";
import { Switch } from "antd";
import "antd/dist/reset.css";
import AccountUpdate from "./mypage_account_update";

const MyPageAccount = () => {
  const { loginMember } = useContext(LoginContext);
  const [marketingModalOpen, setMarketingModalOpen] = useState(false);
  const [selectedMarketingVersion, setSelectedMarketingVersion] = useState("마케팅 활용 동의 v 1.0");
  const [marketingVersionListOpen, setMarketingVersionListOpen] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState({
    marketing: false,
    sns: false,
    email: false,
  });
  const [utilFunction, setUtilFunction] = useState(
    sessionStorage.getItem("utilFunction") || ""
  );
  const formattedPhone = loginMember?.memberPhone
    ? `${loginMember.memberPhone.substring(0, 3)}-${loginMember.memberPhone.substring(3, 7)}-${loginMember.memberPhone.substring(7)}`
    : "";

  useEffect(() => {
    sessionStorage.setItem("utilFunction", utilFunction);
  }, [utilFunction]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("utilFunction");
    }
  })

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

  const handleTermsVersionList = () => {
    setMarketingVersionListOpen(!marketingVersionListOpen);
  };

  const marketingVersionSelection = (version) => {
    setSelectedMarketingVersion(version);
    setMarketingVersionListOpen(false);
  };

  const btnUtilList = (utilItem) => {
    setUtilFunction(utilItem);
  }

  const resetUtilFunction = () => {
    setUtilFunction("");
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
        {!utilFunction && (
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
              <div className={`marketing-modal-wrapper ${marketingModalOpen ? "open" : ""}`}>
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
                        onClick={() => marketingVersionSelection("마케팅 활용 동의 v 1.0")}
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
                <button type="button" onClick={() => btnUtilList("updateProfile")}>내 정보 수정하기</button>
                <button type="button" onClick={() => btnUtilList("updatePw")}>비밀번호 변경하기</button>
                <button type="button" onClick={() => btnUtilList("deleteAccount")}>탈퇴하기</button>
              </div>
            </div>
          </div>
        )}
        {utilFunction === "updateProfile" && (
          <AccountUpdate utilType={"updateProfile"} onCancel={resetUtilFunction}/>
        )}
        {utilFunction === "updatePw" && (
          <AccountUpdate utilType={"updatePw"} onCancel={resetUtilFunction}/>
        )}
        {utilFunction === "deleteAccount" && (
          <AccountUpdate utilType={"deleteAccount"} onCancel={resetUtilFunction}/>
        )}
      </div>
    </section>
  );
};
export default MyPageAccount;
