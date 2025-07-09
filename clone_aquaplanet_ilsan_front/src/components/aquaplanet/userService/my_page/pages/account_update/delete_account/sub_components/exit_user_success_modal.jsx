import moment from "moment";
import React from "react";

const ExitSuccessModal = ({finishExitAccount}) => {
  const today = moment().format("YYYY.MM.DD");

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <button
          className="modal-close-btn"
          type="button"
          onClick={finishExitAccount}
        ></button>
        <div className="result-form">
          <div className="form-content">
            <p>
              {today}부로 <br />
              아쿠아플라넷의 회원 탈퇴요건에 <br />
              동의하셨습니다.
            </p>
          </div>
          <div className="modal-button-list">
            <button
              type="button"
              onClick={finishExitAccount}
              style={{
                backgroundColor: "#2771f1",
                color: "#fff",
                width: "100%",
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExitSuccessModal;
