import axios from "axios";
import React, { useState } from "react";
import "../../../css/aquaplanet/login_modals.css";

const FindIdModal = ({ onClose, switchToPw }) => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
    memberEmail:""
  });

  const insertData = (e) => {
    const { name, value } = e.target;

    setMember((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const searchId = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/aquaplanet/login/find/id", {
        memberName: member.memberName,
        memberPhone: member.memberPhone,
        memberEmail: member.memberEmail
      });

      console.log(response.data);
      if (response.data.result === "FOUND") {
        setUserId(response.data.memberEmail);
        setStep(2);
      } else if (response.data.result === "NOT_FOUND") {
        alert("일치하는 회원 정보를 찾을 수 없습니다.");
        return;
      } else {
        alert("일치하는 회원 정보를 찾을 수 없습니다.");
        return;
      }
    } catch {
      alert("에러 발생");
      return;
    }
  };

  return (
      <div className="modal-wrapper">
      <div className="modal-container">
        <button
          className="modal-close-btn"
          type="button"
          onClick={onClose}
        ></button>
        {step === 1 && (
          <div className="search-form">
            <form onSubmit={searchId}>
              <div className="form-content">
                <span className="form-title">ID 찾기</span>
                <div className="form-item">
                  <label htmlFor="memberName">이름</label>
                  <input
                    id="memberName"
                    name="memberName"
                    type="text"
                    value={member.memberName}
                    onChange={insertData}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="memberPhone">휴대폰번호</label>
                  <input
                    id="memberPhone"
                    name="memberPhone"
                    type="text"
                    value={member.memberPhone}
                    onChange={insertData}
                    required
                  />
                </div>
              </div>
              <button>아이디 찾기</button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="result-form">
            <div className="form-content">
              <span className="form-title">ID 찾기</span>
              <p>
                회원님의 아이디는
                <br />
                <span className="user-id-color">{userId}</span>입니다.
              </p>
              <p>
                아이디를 확인 하신 후 아이디와 비밀번호로 로그인 하시고
                회원정보수정에서 비밀번호를 변경하시기 바랍니다.
              </p>
            </div>
            <div className="modal-button-list">
              <button type="button" onClick={onClose}>
                로그인하기
              </button>
              <button type="button" onClick={switchToPw}>
                비밀번호 찾기
              </button>
            </div>
          </div>
        )}
      </div>
      </div>

  );
};
export default FindIdModal;
