import React, { useContext, useState } from "react";
import LoginContext from "../../../LoginContext";
import { useNavigate } from "react-router-dom";
import '../../../../css/aquaplanet/aquaplanet_mypage_account.css';
import axiosInstance from "../../../axiosIntercepting";

const AccountCertification = () => {
  const { loginMember } = useContext(LoginContext);
  const [pwVision, setPwVision] = useState(false);
  const [inputPw, setInputPw] = useState("");
  const navigate = useNavigate();
  const msg = {
    INVALID1: "비밀번호가 일치하지 않습니다.",
    INVALID2: "비밀번호를 정확히 입력해주세요"
  }

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const userCertification = async (e) => {
    e.preventDefault();

    try{
      const response = await axiosInstance.post("/aquaplanet/mypage/checkPassword",
        {
          memberNo:loginMember.memberNo,
          inputPw:inputPw
        });
      if(response.data.result === "validated"){
        navigate("/aquaplanet/member/mypage/updateUserInfo");
      }
      else{
        alert(msg.INVALID1);
      }
    }
    catch{
      alert(msg.INVALID2);
    }

  };

  const backToSetting = () => {
    navigate("/aquaplanet/member/mypage/setting");
  };

  if(!loginMember){
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
                value={inputPw}
                onChange={(e) => setInputPw(e.target.value)}
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
