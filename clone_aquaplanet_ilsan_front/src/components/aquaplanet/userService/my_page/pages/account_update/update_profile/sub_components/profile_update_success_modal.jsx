import React from "react";

const UpdateSuccessModal = ({ completeModifyProfile }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <button
          className="modal-close-btn"
          type="button"
          onClick={completeModifyProfile}
        ></button>
        <div className="result-form">
          <div className="form-content">
            <span className="form-title">
              내 정보가 정상적으로 <br />
              수정되었습니다.
            </span>
            <p>아래 확인 버튼을 눌러주세요!</p>
          </div>
          <div className="modal-button-list">
            <button
              type="button"
              onClick={completeModifyProfile}
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
export default UpdateSuccessModal;
