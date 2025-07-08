import { useState } from "react";
import CustomDropdown from "../../../common_sub_components/customDropdown";
import TermsDetail from "./aquaplanet_terms_detail";

const TermsModal = ({ isOpen, onClose }) => {
  const [selectedTermsVersion, setSelectedTermsVersion] = useState("이용약관 v 1.0");
  const termsVersion = ["이용약관 v 1.0"];

  return (
    <div className={`terms-modal-wrapper ${isOpen ? "open" : ""}`}>
      <div className="terms-modal-container">
        <button
          className="modal-close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal-terms-content">
          <h2>한화 아쿠아플라넷몰 서비스 이용약관</h2>
          <CustomDropdown
            options={termsVersion}
            selectedValue={selectedTermsVersion}
            displayClassName="terms-version-display"
            selectorClassName="terms-version-selector"
            optionClassName="terms-version-item"
            onSelect={setSelectedTermsVersion}
          />
          <hr />
          <TermsDetail />
        </div>
      </div>
    </div>
  );
};
export default TermsModal;
