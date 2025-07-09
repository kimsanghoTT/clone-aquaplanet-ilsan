import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../../../../../../LoginContext";
import { useNavigate } from "react-router-dom";
import { passwordPattern } from "../../../../common_data/validation_pattern";
import { msg } from "../data/msg";
import axiosInstance from "../../../../../../_axiosIntercepting/axiosIntercepting";

const UpdatePassword = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const navigate = useNavigate();

  const [pwVision, setPwVision] = useState(false);
  const [modifyPw, setModifyPw] = useState("");
  const [modifyPwDoubleCheck, setModifyPwDoubleCheck] = useState("");
  const [pwCheck, setPwCheck] = useState(true);

  useEffect(() => {
    setPwCheck(modifyPw !== "" && passwordPattern.test(modifyPw));
  }, [modifyPw]);

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const submitModifyPw = async (e) => {
    e.preventDefault();

    if (!passwordPattern.test(modifyPw)) {
      alert(msg.PW_FORMAT);
      return;
    }
    if (modifyPw !== modifyPwDoubleCheck) {
      alert(msg.PW_CONFIRM);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/aquaplanet/login/find/updatePw",
        {
          memberEmail: loginMember.memberEmail,
          memberPw: modifyPw,
        }
      );
      if (response.data.result === "SUCCESS") {
        alert(msg.PW_CHANGE);
        navigate("/aquaplanet/member/mypage/userInfo");
        setLoginMember({
          ...loginMember,
          memberPw: modifyPw,
        });
      } else if (response.data.result === "USED_PW") {
        alert(msg.USED_PW);
        return;
      } else {
        alert(msg.GENERIC_ERROR);
        return;
      }
    } catch {
      alert(msg.GENERIC_ERROR);
      return;
    }
  };

  const onCancel = () => {
    navigate("/aquaplanet/member/mypage/userInfo");
  };

  return (
    <section className="member-mypage">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>비밀번호 변경</p>
            <p style={{ marginBottom: "35px" }}>
              비밀번호는 영문, 숫자가 포함된 10~13자리 <br />
              또는 영문, 숫자, 특수문자가 포함된 8~13자리로 <br />
              설정이 가능합니다.
            </p>
          </div>
          <div className="member-mypage-content member-update-pw">
            <form onSubmit={submitModifyPw}>
              <div className="form-item">
                <label htmlFor="modifyPw" style={{ fontSize: "14px" }}>
                  새 비밀번호
                </label>
                <button
                  type="button"
                  className={`pw-vision ${pwVision ? "on" : ""}`}
                  onClick={pwVisionOn}
                >
                  <span className="ico1"></span>
                </button>
                <div className="pw-modify-entryBox">
                  <input
                    id="modifyPw"
                    type={pwVision ? "text" : "password"}
                    value={modifyPw}
                    onChange={(e) => setModifyPw(e.target.value)}
                    required
                    placeholder="새로운 비밀번호를 입력해 주세요"
                  />
                  <div
                    className={`modify-errMsg-box ${!pwCheck && modifyPw ? "err-on" : ""}`}
                  >
                    <span className="modify-errMsg">{msg.PW_FORMAT1}</span>
                    <span className="modify-errMsg">{msg.PW_FORMAT2}</span>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="newPwDoubleCheck">새 비밀번호 확인</label>
                <input
                  id="newPwDoubleCheck"
                  onChange={(e) => setModifyPwDoubleCheck(e.target.value)}
                  value={modifyPwDoubleCheck}
                  type="password"
                  required
                />
              </div>
              <div className="mypage-modify-btn-area">
                <button>비밀번호 변경</button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default UpdatePassword;
