import axios from "axios";
import React, { useMemo, useState } from "react";
import "../../../css/aquaplanet/login_modals.css";

const FindPwModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [authCode, setAuthCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwDoubleCheck, setNewPwDoubleCheck] = useState("");
  const [pwVision, setPwVision] = useState(false);
  const [member, setMember] = useState({
    memberEmail: "",
  });
  const msg = {
    SEND_AUTHCODE: "이메일로 인증번호가 발송되었습니다.",
    NOT_FOUND: "입력하신 이메일과 일치하는 회원 정보를 찾을 수 없습니다.",
    UNKNOWN_ERR: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
    INVALID_CODE: "인증번호가 일치하지 않습니다.",
    AUTH_SUCCESS: "인증 성공",
    PW_CHANGE: "비밀번호가 변경되었습니다.",
    PW_FORMAT:
      "비밀번호는 영문 숫자 포함 10~13자, 특수문자 포함 시 8~13자로 입력해 주세요",
    PW_CONFIRM: "비밀번호가 일치하지 않습니다",
    USED_PW: "이전과 다른 비밀번호를 작성해주세요",
  };

  const passwordPattern = useMemo(
    () =>
      /^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}|(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{10,13})$/,
    []
  );

  const insertData = (e) => {
    const { name, value } = e.target;

    setMember((userdata) => ({
      ...userdata,
      [name]: value,
    }));
  };

  const requestAuthCode = async (e) => {
    e.preventDefault();
    console.log(member);
    try {
      const response = await axios.post("/aquaplanet/login/find/requestCode", {
        memberEmail: member.memberEmail,
      });

      if (response.data.result === "SUCCESS") {
        alert(msg.SEND_AUTHCODE);
        setStep(2);
      } else if (response.data.result === "NOT_FOUND") {
        alert(msg.NOT_FOUND);
      } else {
        alert(msg.UNKNOWN_ERR);
      }
    } catch {
      alert(msg.UNKNOWN_ERR);
    }
  };

  const verifyingAuthCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/aquaplanet/login/find/verifyCode", {
        memberEmail: member.memberEmail,
        authCode: authCode,
      });

      if (response.data.result === "SUCCESS") {
        alert(msg.AUTH_SUCCESS);
        setStep(3);
      } else if (response.data.result === "INVALID") {
        alert(msg.INVALID_CODE);
      } else {
        alert(msg.UNKNOWN_ERR);
      }
    } catch {
      alert(msg.UNKNOWN_ERR);
    }
  };

  const updatePw = async (e) => {
    e.preventDefault();

    if (!passwordPattern.test(newPw)) {
      alert(msg.PW_FORMAT);
      return;
    }
    if (newPw === "") {
      alert(msg.PW_FORMAT);
      return;
    }
    if (newPw !== newPwDoubleCheck) {
      alert(msg.PW_CONFIRM);
      return;
    }

    try {
      const response = await axios.post("/aquaplanet/login/find/updatePw", {
        memberEmail: member.memberEmail,
        memberPw: newPw,
      });
      if (response.data.result === "SUCCESS") {
        alert(msg.PW_CHANGE);
        setStep(4);
      } else if (response.data.result === "USED_PW") {
        alert(msg.USED_PW);
        return;
      } else {
        alert(msg.UNKNOWN_ERR);
      }
    } catch {
      alert(msg.UNKNOWN_ERR);
    }
  };

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  return (
    <>
      <div className="modal-overlay-film"></div>
      <div className="modal-container">
        <button type="button" onClick={onClose}>X</button>
        {step === 1 && (
          <div className="search-form">
            <form onSubmit={requestAuthCode}>
              <label htmlFor="memberEmail">이메일 인증</label>
              <input
                id="memberEmail"
                name="memberEmail"
                type="text"
                value={member.memberEmail}
                onChange={insertData}
              />
              <button>인증번호 보내기</button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="search-form">
            <form onSubmit={verifyingAuthCode}>
              <label htmlFor="authCode">인증번호 입력</label>
              <input
                id="authCode"
                onChange={(e) => setAuthCode(e.target.value)}
                value={authCode}
                type="text"
              />
              <button>코드 인증하기</button>
            </form>
          </div>
        )}
        {step === 3 && (
          <div className="search-form">
            <form onSubmit={updatePw}>
              <label htmlFor="newPw">비밀번호 재설정</label>
              <button
                type="button"
                className={`pw-vision ${pwVision ? "on" : ""}`}
                onClick={pwVisionOn}
              >
                <span className="ico1"></span>
              </button>
              <input
                id="newPw"
                onChange={(e) => setNewPw(e.target.value)}
                value={newPw}
                type="password"
              />
              <label htmlFor="newPwDoubleCheck">비밀번호 재설정 확인</label>
              <input
                id="newPwDoubleCheck"
                onChange={(e) => setNewPwDoubleCheck(e.target.value)}
                value={newPwDoubleCheck}
                type="password"
              />
              <button>비밀번호 재설정</button>
            </form>
          </div>
        )}
        {step === 4 && (
          <div className="result-form">
            <p>비밀번호 재설정이 완료되었습니다.</p>
            <button type="button" onClick={onClose}>
              닫기
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default FindPwModal;
