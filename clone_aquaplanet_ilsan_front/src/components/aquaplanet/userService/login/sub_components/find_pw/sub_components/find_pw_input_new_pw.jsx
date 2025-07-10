import React from "react";

const FindPwUpdateForm = ({
  newPw,
  inputNewPw,
  newPwDoubleCheck,
  inputNewPwDoubleCheck,
  pwVision,
  pwVisionOn,
  updatePw,
}) => {
  return (
    <div className="search-form">
      <form onSubmit={updatePw}>
        <div className="form-content">
          <span className="form-title">비밀번호 찾기</span>
          <div className="form-item">
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
              onChange={inputNewPw}
              value={newPw}
              type={pwVision ? "text" : "password"}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="newPwDoubleCheck">비밀번호 재설정 확인</label>
            <input
              id="newPwDoubleCheck"
              onChange={inputNewPwDoubleCheck}
              value={newPwDoubleCheck}
              type="password"
              required
            />
          </div>
        </div>
        <button type="submit">비밀번호 재설정</button>
      </form>
    </div>
  );
};

export default FindPwUpdateForm;
