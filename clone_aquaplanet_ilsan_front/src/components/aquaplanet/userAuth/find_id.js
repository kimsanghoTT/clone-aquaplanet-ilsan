import axios from "axios";
import React, { useState } from "react";
import "../../../css/aquaplanet/login_modals.css";

const FindIdModal = ({onClose}) => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
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
      });
      if (response.data !== null) {
        setUserId(response.data);
        setStep(2);
      } else {
        alert("일치하는 회원 정보를 찾을 수 없습니다.");
      }
    } catch {
      alert("에러 발생");
    }
  };

  return (
    <>
      <div className="modal-overlay-film"></div>
      <div className="modal-container">
        <button type="button" onClick={onClose}>X</button>
        {step === 1 && (
        <div className="search-form">
          <form onSubmit={searchId}>
            <label htmlFor="memberName">이름</label>
            <input
              id="memberName"
              name="memberName"
              type="text"
              value={member.memberName}
              onChange={insertData}
            />
            <label htmlFor="memberPhone">휴대폰번호</label>
            <input
              id="memberPhone"
              name="memberPhone"
              type="text"
              value={member.memberPhone}
              onChange={insertData}
            />
            <button>아이디 찾기</button>
          </form>
        </div>
        )}
        {step === 2 && (
        <div className="result-form">
          <p>회원님의 아이디는 {userId}입니다.</p>
          <button type="button" onClick={onClose}></button>
        </div>
        )}
      </div>
    </>
  );
};
export default FindIdModal;
