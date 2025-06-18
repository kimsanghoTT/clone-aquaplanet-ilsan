import React, { useContext, useState } from "react";
import LoginContext from "../../LoginContext";
import { useNavigate } from "react-router-dom";
import '../../../css/aquaplanet/mypage_account.css';

const AccountCertification = () => {
  const { loginMember } = useContext(LoginContext);
  const [pwVision, setPwVision] = useState(false);
  const [certification, setCertification] = useState("");
  const navigate = useNavigate();

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const userCertification = () => {
    if (loginMember.memberPw === certification) {
      navigate("/aquaplanet/member/mypage/updateUserInfo");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const backToSetting = () => {
    navigate("/aquaplanet/member/mypage/setting");
  };

  if(!loginMember){
    return;
  }

  console.log(loginMember);

  return (
    <section className="member-mypage">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>비밀번호 확인</p>
            <p style={{ marginBottom: "35px" }}>
              고객정보 확인을 위해 비밀번호를 입력해 주세요.
            </p>
          </div>
          <div className="member-mypage-content member-certification">
            <div className="form-item">
              <label htmlFor="newPw" style={{ fontSize: "14px" }}>
                비밀번호
              </label>
              <button
                type="button"
                className={`pw-vision ${pwVision ? "on" : ""}`}
                onClick={pwVisionOn}
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
            <div className="mypage-certification-btn-area">
              <button type="button" onClick={userCertification}>
                확인
              </button>
              <button type="button" onClick={backToSetting}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AccountCertification;
