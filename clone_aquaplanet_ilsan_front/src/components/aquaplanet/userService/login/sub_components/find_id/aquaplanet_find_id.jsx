import React from "react";
import FindIdForm from "./sub_components/find_id_form.jsx";
import FindIdResult from "./sub_components/find_id_result.jsx";
import useFindId from "../../hooks/useFIndId";

const FindIdModal = ({ onClose, switchToPwModal }) => {
  const {step, userId, member, insertData, searchId} = useFindId();

  return (
      <div className="modal-wrapper">
      <div className="modal-container">
        <button
          className="modal-close-btn"
          type="button"
          onClick={onClose}
        ></button>
        {step === 1 && (
          <FindIdForm member={member} insertData={insertData} searchId={searchId}/>
        )}
        {step === 2 && (
          <FindIdResult userId={userId} onClose={onClose} switchToPwModal={switchToPwModal}/>
        )}
      </div>
      </div>
  );
};
export default FindIdModal;
