import React from "react";

const FindPwInputEmail = ({ memberEmail, inputEmail, requestAuthCode }) => {
  return (
    <div className="search-form">
      <form onSubmit={requestAuthCode}>
        <div className="form-content">
          <span className="form-title">비밀번호 찾기</span>
          <div className="form-item">
            <label htmlFor="memberEmail">이메일 인증</label>
            <input
              id="memberEmail"
              name="memberEmail"
              type="text"
              value={memberEmail}
              onChange={inputEmail}
              required
            />
          </div>
        </div>
        <button type="submit">인증번호 보내기</button>
      </form>
    </div>
  );
};

export default FindPwInputEmail;
