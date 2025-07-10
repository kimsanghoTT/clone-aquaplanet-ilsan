import React, { useState } from "react";
import { errMsg } from "./data/err_msg";
import "../../../../css/aquaplanet/aquaplanet_signup.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../_axiosIntercepting/axiosIntercepting";
import useMemberState from "./hooks/useMemberState";
import useValidation from "./hooks/useValidation";
import useCopyEmail from "./hooks/useCopyEmail";
import usePreferredBranch from "./hooks/usePreferredBranch";
import SignupPersonalForm from "./sub_components/signup_personal_form.jsx";
import SignupPreferredBranchForm from "./sub_components/signup_preferred_branch_form.jsx";
import useRegionSelector from "./hooks/useRegionSelector";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const { member, setMember, insertData } = useMemberState();
  const { usingSameEmail } = useCopyEmail({ member, setMember });
  const {
    idCheck,
    pwCheck,
    subEmailCheck,
    pwDoubleCheck,
    handlePwDoubleCheck,
    emailDuplicateCheck,
    validateBeforeSubmit,
  } = useValidation(member);
  const {
    citySelectorOpen,
    districtSelectorOpen,
    selectedCityIndex,
    selectedDistrictIndex,
    cityLabel,
    districtLabel,
    availableDistrict,
    cityRef,
    districtRef,
    openRegionSelectorBtn,
    selectCity,
    selectDistrict,
    resetCitySelection,
    resetDistrictSelection,
  } = useRegionSelector({member, setMember});
  const { selectedPreferredBranch, preferredBranchSelection } =
    usePreferredBranch(setMember);

  const submitFinalMemberData = async (e) => {
    e.preventDefault();

    if (member.preferredBranch.length === 0) {
      alert(errMsg.PREFERRED_BRANCH);
      return;
    }

    const finalData = {
      ...member,
      preferredBranch: member.preferredBranch.join(","),
    };

    try {
      const response = await axiosInstance.post(
        "/aquaplanet/signup",
        finalData
      );
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다. 로그인 후 이용할 수 있습니다.");
        navigate("/aquaplanet/member/login");
      } else {
        alert(errMsg.GENERIC_ERROR);
      }
    } catch {
      alert(errMsg.GENERIC_ERROR);
    }
  };

  return (
    <section className="member-signup">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
        {step === 1 && (
          <SignupPersonalForm
            validateBeforeSubmit={validateBeforeSubmit}
            setStep={setStep}
            member={member}
            insertData={insertData}
            emailDuplicateCheck={emailDuplicateCheck}
            idCheck={idCheck}
            pwCheck={pwCheck}
            pwDoubleCheck={pwDoubleCheck}
            handlePwDoubleCheck={handlePwDoubleCheck}
            usingSameEmail={usingSameEmail}
            subEmailCheck={subEmailCheck}
            cityRef={cityRef}
            openRegionSelectorBtn={openRegionSelectorBtn}
            cityLabel={cityLabel}
            citySelectorOpen={citySelectorOpen}
            resetCitySelection={resetCitySelection}
            selectedCityIndex={selectedCityIndex}
            selectCity={selectCity}
            districtRef={districtRef}
            districtLabel={districtLabel}
            districtSelectorOpen={districtSelectorOpen}
            resetDistrictSelection={resetDistrictSelection}
            availableDistrict={availableDistrict}
            selectedDistrictIndex={selectedDistrictIndex}
            selectDistrict={selectDistrict}
          />
        )}
        {step === 2 && (
          <SignupPreferredBranchForm
            preferredBranchSelection={preferredBranchSelection}
            selectedPreferredBranch={selectedPreferredBranch}
            submitFinalMemberData={submitFinalMemberData}
          />
        )}
      </div>
    </section>
  );
};
export default Signup;
