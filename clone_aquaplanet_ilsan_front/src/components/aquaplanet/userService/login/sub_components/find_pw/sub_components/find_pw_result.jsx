import React from "react";

const FindPwResult = ({ onClose }) => {
  return (
    <div className="result-form">
      <div className="form-content">
        <span className="form-title">비밀번호 찾기</span>
        <p>비밀번호 재설정이 완료되었습니다.</p>
      </div>
      <button
        style={{
          backgroundColor: "#2771f1",
          width: "100%",
          border: "none",
          color: "#fff",
        }}
        type="button"
        onClick={onClose}
      >
        확인
      </button>
    </div>
  );
};
export default FindPwResult;
