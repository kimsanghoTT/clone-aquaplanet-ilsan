import React from "react";
import useFindPw from "../../hooks/useFindPw";
import FindPwInputEmail from "./find_pw_input_email_form";
import FindPwInputAuthCode from "./find_pw_input_auth_code_form";
import FindPwUpdateForm from "./find_pw_input_new_pw";
import FindPwResult from "./find_pw_result";

const FindPwModal = ({ onClose }) => {
  const {
    step,
    memberEmail,
    authCode,
    newPw,
    newPwDoubleCheck,
    pwVision,
    inputEmail,
    inputAuthCode,
    inputNewPw,
    inputNewPwDoubleCheck,
    pwVisionOn,
    requestAuthCode,
    verifyingAuthCode,
    updatePw,
  } = useFindPw();

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <button
          className="modal-close-btn"
          type="button"
          onClick={onClose}
        ></button>
        {step === 1 && (
          <FindPwInputEmail
            memberEmail={memberEmail}
            inputEmail={inputEmail}
            requestAuthCode={requestAuthCode}
          />
        )}
        {step === 2 && (
          <FindPwInputAuthCode
            authCode={authCode}
            inputAuthCode={inputAuthCode}
            verifyingAuthCode={verifyingAuthCode}
          />
        )}
        {step === 3 && (
          <FindPwUpdateForm
            newPw={newPw}
            inputNewPw={inputNewPw}
            newPwDoubleCheck={newPwDoubleCheck}
            inputNewPwDoubleCheck={inputNewPwDoubleCheck}
            pwVision={pwVision}
            pwVisionOn={pwVisionOn}
            updatePw={updatePw}
          />
        )}
        {step === 4 && <FindPwResult onClose={onClose}/>}
      </div>
    </div>
  );
};
export default FindPwModal;
