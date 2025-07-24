import React, { useContext } from "react";
import '../../../../../../css/aquaplanet/aquaplanet_mypage_account.css';
import LoginContext from "../../../../../LoginContext";
import { useNavigate } from "react-router-dom";
import UserProfileSection from "./sub_components/user_profile_section.jsx";
import MarketingSection from "./sub_components/marketing_section.jsx";

const MyPageAccount = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const navigate = useNavigate();

  if (!loginMember) {
    alert("잘못된 접근입니다.");
    return;
  }

  return (
    <section className="member-mypage">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
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
            <UserProfileSection
              loginMember={loginMember}
              setLoginMember={setLoginMember}
            />
            <MarketingSection/>
            <div className="mypage-util-btn-area">
              <button type="button" onClick={() => navigate("/aquaplanet/member/mypage/updateProfile")}>내 정보 수정하기</button>
              <button type="button" onClick={() => navigate("/aquaplanet/member/mypage/updatePassword")}>비밀번호 변경하기</button>
              <button type="button" onClick={() => navigate("/aquaplanet/member/mypage/deleteAccount")}>탈퇴하기</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyPageAccount;
