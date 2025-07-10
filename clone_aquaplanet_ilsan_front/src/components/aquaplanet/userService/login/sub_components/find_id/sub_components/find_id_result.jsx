import React from "react";

const FindIdResult = ({ userId, onClose, switchToPwModal }) => {
  return (
    <div className="result-form">
      <div className="form-content">
        <span className="form-title">ID 찾기</span>
        <p>
          회원님의 아이디는
          <br />
          <span className="user-id-color">{userId}</span>입니다.
        </p>
        <p>
          아이디를 확인 하신 후 아이디와 비밀번호로 로그인 하시고 <br/>
          회원정보수정에서 비밀번호를 변경하시기 바랍니다.
        </p>
      </div>
      <div className="modal-button-list">
        <button type="button" onClick={onClose}>
          로그인하기
        </button>
        <button type="button" onClick={switchToPwModal}>
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default FindIdResult;
