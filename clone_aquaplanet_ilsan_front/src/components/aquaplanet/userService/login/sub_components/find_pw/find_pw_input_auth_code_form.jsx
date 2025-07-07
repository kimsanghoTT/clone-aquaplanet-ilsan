import React from "react";

const FindPwInputAuthCode = ({
  authCode,
  inputAuthCode,
  verifyingAuthCode,
}) => {
  return (
    <div className="search-form">
      <form onSubmit={verifyingAuthCode}>
        <div className="form-content">
          <span className="form-title">비밀번호 찾기</span>
          <div className="form-item">
            <label htmlFor="authCode">인증번호 입력</label>
            <input
              id="authCode"
              onChange={inputAuthCode}
              value={authCode}
              type="text"
              required
            />
          </div>
        </div>
        <button type="submit">코드 인증하기</button>
      </form>
    </div>
  );
};

export default FindPwInputAuthCode;
