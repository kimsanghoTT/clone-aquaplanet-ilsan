import React, { useEffect, useRef} from "react";
import cityData from "../city_district.json";
import "../../../../css/aquaplanet/aquaplanet_signup.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../_axiosIntercepting/axiosIntercepting";
import { errMsg } from "./data/err_msg";
import useSignupFormState from "./hooks/useSignupFormState";
import useAuthValidation from "./hooks/useAuthValidation";

const Signup = () => {
  const navigate = useNavigate();
  const {
    member, setMember, 
    memberName, handleMemberNameChange, setMemberName, 
    memberPhone, handleMemberPhoneChange, setMemberPhone, 
    emailDupleCheck, setEmailDupleCheck,
    idCheck, setIdCheck,
    pwCheck, setPwCheck,
    subEmailCheck, setSubEmailCheck,
    pwDoubleCheck, handlePwDoubleCheckChange, setPwDoubleCheck,
    copyEmail, setCopyEmail,
    pwVision, setPwVision,
    citySelectorOpen, setCitySelectorOpen,
    districtSelectorOpen, setDistrictSelectorOpen,
    selectedCityIndex, setSelectedCityIndex,
    selectedDistrictIndex, setSelectedDistrictIndex,
    cityLabel, setCityLabel,
    districtLabel, setDistrictLabel,
    availableDistrict, setAvailableDistrict,
    selectedPreferredBranch, setSelectedPreferredBranch,
    step, setStep,
    insertData,
    pwVisionOn,
    usingSameEmail,
  } = useSignupFormState();
  const {
    emailPattern,
    passwordPattern,
    namePattern,
    phonePattern,
    duplicateCheck,
  } = useAuthValidation({
    memberEmail: member.memberEmail,
    memberPw: member.memberPw,
    memberSubEmail: member.memberSubEmail,
    setIdCheck: setIdCheck,
    setPwCheck: setPwCheck,
    setSubEmailCheck: setSubEmailCheck,
    setEmailDupleCheck: setEmailDupleCheck,
  })





  const submitPersonalData = async (e) => {
    e.preventDefault();

    if (!idCheck) {
      alert(
        member.memberEmail === "" ? errMsg.EMAIL_REQUIRED : errMsg.EMAIL_FORMAT
      );
      return;
    }

    if (!pwCheck) {
      alert(member.memberPw === "" ? errMsg.PW_REQUIRED : errMsg.PW_FORMAT);
      return;
    }

    if (!subEmailCheck) {
      alert(errMsg.EMAIL_FORMAT);
      return;
    }

    if (!dupleCheck) {
      alert(errMsg.EMAIL_DUPLE_CHECK_REQUIRED);
      return;
    }

    if (member.memberPw !== pwDoubleCheck) {
      alert(errMsg.PW_CONFIRM);
      return;
    }

    if (!namePattern.test(member.memberName)) {
      alert(errMsg.NAME_FORMAT);
      return;
    }
    if (!phonePattern.test(member.memberPhone)) {
      alert(errMsg.PHONE_FORMAT);
      return;
    }

    setStep(2);
  };

  const preferredBranchSelection = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setSelectedPreferredBranch((branch) => ({
      ...branch,
      [value]: checked,
    }));

    setMember(member => {
      let branches;
      if(checked){
        branches = member.preferredBranch.includes(value) ? member.preferredBranch : [...member.preferredBranch, value];
      }
      else{
        branches = member.preferredBranch.filter(item => item !== value);
      }
      return {
        ...member,
        preferredBranch: branches
      }
    })
  };

  const submitFinalMemberData = async (e) => {
    e.preventDefault();

    if(member.preferredBranch.length === 0){
      alert(errMsg.PREFERRED_BRANCH);
      return;
    }

    const finalData = {
      ...member,
      preferredBranch: member.preferredBranch.join(",")
    }

    try {
      const response = await axiosInstance.post("/aquaplanet/signup", finalData);
      if(response.status === 200){
      alert("회원가입이 완료되었습니다. 로그인 후 이용할 수 있습니다.");
      navigate("/aquaplanet/member/login");
      }
      else{
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
          <div className="member-signup-personal-box">
            <div className="member-signup-title">
              <p>회원가입</p>
              <p>자주 쓰는 메일로 시작해 보세요</p>
            </div>
            <form className="signup-form" onSubmit={submitPersonalData}>
              <div className="signup-form-content form-content01">
                <label htmlFor="memberName">이름</label>
                <input
                  id="memberName"
                  type="text"
                  name="memberName"
                  value={memberName}
                  onChange={handleMemberNameChange}
                  placeholder="이름을 입력해주세요"
                />
              </div>

              <div className="signup-form-content form-content02">
                <label htmlFor="memberPhone">휴대폰 번호</label>
                <input
                  id="memberPhone"
                  type="text"
                  name="memberPhone"
                  value={memberPhone}
                  onChange={handleMemberPhoneChange}
                  placeholder="휴대폰 번호를 입력해주세요. '-'빼고 입력"
                />
              </div>

              <div className="signup-form-content form-content03">
                <label htmlFor="memberEmail">아이디</label>
                <button
                  className="duplicateCheckBtn"
                  type="button"
                  onClick={duplicateCheck}
                  value={member.memberEmail}
                >
                  중복체크
                </button>
                <input
                  id="memberEmail"
                  type="text"
                  name="memberEmail"
                  value={member.memberEmail}
                  onChange={insertData}
                  placeholder="아이디로 사용하실 이메일을 입력해주세요"
                />
                <span
                  className={`email-err-msg ${!idCheck && member.memberEmail ? "err-on" : ""}`}
                >
                  {errMsg.EMAIL_FORMAT}
                </span>
              </div>

              <div className="signup-form-content form-content04">
                <label htmlFor="memberPw">비밀번호</label>
                <button
                  type="button"
                  className={`pw-vision ${pwVision ? "on" : ""}`}
                  onClick={pwVisionOn}
                >
                  <span className="ico1"></span>
                </button>
                <input
                  id="memberPw"
                  type={pwVision ? "text" : "password"}
                  name="memberPw"
                  value={member.memberPw}
                  onChange={insertData}
                  placeholder="사용하실 비밀번호를 입력해주세요"
                />
                <span
                  className={`pw-err-msg ${!pwCheck && member.memberPw ? "err-on" : ""}`}
                >
                  <span>{errMsg.PW_FORMAT_DESC_1}</span>
                  <span>{errMsg.PW_FORMAT_DESC_2}</span>
                </span>
              </div>

              <div className="signup-form-content form-content05">
                <label htmlFor="memberPwConfirm">비밀번호 확인</label>
                <input
                  id="memberPwConfirm"
                  type="password"
                  name="memberPwConfirm"
                  value={pwDoubleCheck}
                  onChange={handlePwDoubleCheckChange}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <span
                  className={`confirm-pw-err-msg ${pwDoubleCheck !== "" && pwDoubleCheck !== member.memberPw ? "err-on" : ""}`}
                >
                  <span>{errMsg.PW_CONFIRM}</span>
                </span>
              </div>

              <div className="signup-form-content form-content06">
                <label htmlFor="memberSubEmail">추가 이메일(선택)</label>
                <button
                  className="sameEmailBtn"
                  type="button"
                  onClick={usingSameEmail}
                >
                  <span>아이디와 동일한 이메일</span>
                </button>
                <input
                  id="memberSubEmail"
                  type="text"
                  name="memberSubEmail"
                  value={member.memberSubEmail}
                  onChange={insertData}
                  placeholder="소식을 받아보실 이메일 주소를 입력해주세요"
                />
                <span
                  className={`subEmail-err-msg ${!subEmailCheck && member.memberSubEmail ? "err-on" : ""}`}
                >
                  <span>{errMsg.EMAIL_FORMAT}</span>
                </span>
              </div>

              <div className="signup-form-content form-content07">
                <label>거주지역(선택)</label>
                <div>
                  <select
                    name="memberRegionCity"
                    value={member.memberRegionCity}
                    onChange={insertData}
                  >
                    <option value="" disabled>
                      광역시/도
                    </option>
                    {cityData.map((data, index) => (
                      <option key={index} value={data.city}>
                        {data.city}
                      </option>
                    ))}
                  </select>
                  <select
                    name="memberRegionDistrict"
                    value={member.memberRegionDistrict}
                    onChange={insertData}
                  >
                    <option value="" disabled>
                      시/군/구
                    </option>
                    {availableDistrict.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="region-selector">
                  <div ref={cityRef} className="select-city-box">
                    <span
                      className="select-city"
                      ref={cityRef}
                      onClick={() => openBtn(1)}
                    >
                      <span>{cityLabel}</span>
                      <span
                        className={`ico ${citySelectorOpen ? "on" : ""}`}
                      ></span>
                    </span>
                    <ul
                      style={
                        citySelectorOpen
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <li className="city-item" onClick={resetRegionSelection}>광역시/도</li>
                      {cityData.map((data, index) => (
                        <li
                          className={`city-item ${selectedCityIndex === index ? "on" : ""}`}
                          key={index}
                          data-value={data.city}
                          datatype="memberRegionCity"
                          onClick={(e) => {
                            selection(e);
                            updateSelectedLabel(index, "city");
                          }}
                        >
                          {data.city}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div ref={districtRef} className="select-district-box">
                    <span
                      className="select-district"
                      ref={districtRef}
                      onClick={() => openBtn(2)}
                    >
                      <span>{districtLabel}</span>
                      <span
                        className={`ico ${districtSelectorOpen ? "on" : ""}`}
                      ></span>
                    </span>
                    <ul
                      style={
                        districtSelectorOpen
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <li className="district-item">시/군/구</li>
                      {availableDistrict.map((district, index) => (
                        <li
                          className={`district-item ${selectedDistrictIndex === index ? "on" : ""}`}
                          key={index}
                          data-value={district}
                          datatype="memberRegionDistrict"
                          onClick={(e) => {
                            selection(e);
                            updateSelectedLabel(index, "district");
                          }}
                        >
                          {district}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button className="signup-submit-btn" type="submit">
                입력완료
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="member-signup-preferred-branch-box">
            <div className="member-signup-title">
              <p>
                아쿠아플라넷에 <br />
                오신 걸 환영해요!
              </p>
              <p>어디로 방문하실 계획이신가요?</p>
            </div>
            <form className="signup-form" onSubmit={submitFinalMemberData}>
              <label
                className={selectedPreferredBranch["여수"] ? "on" : ""}
                htmlFor="여수"
              >
                여수
              </label>
              <input
                checked={selectedPreferredBranch["여수"] || false}
                type="checkbox"
                id="여수"
                value={"여수"}
                onChange={preferredBranchSelection}
              />

              <label
                className={selectedPreferredBranch["제주"] ? "on" : ""}
                htmlFor="제주"
              >
                제주
              </label>
              <input
                checked={selectedPreferredBranch["제주"] || false}
                type="checkbox"
                id="제주"
                value={"제주"}
                onChange={preferredBranchSelection}
              />

              <label
                className={selectedPreferredBranch["일산"] ? "on" : ""}
                htmlFor="일산"
              >
                일산
              </label>
              <input
                checked={selectedPreferredBranch["일산"] || false}
                type="checkbox"
                id="일산"
                value={"일산"}
                onChange={preferredBranchSelection}
              />

              <label
                className={selectedPreferredBranch["광교"] ? "on" : ""}
                htmlFor="광교"
              >
                광교
              </label>
              <input
                checked={selectedPreferredBranch["광교"] || false}
                type="checkbox"
                id="광교"
                value={"광교"}
                onChange={preferredBranchSelection}
              />
              <button className="signup-submit-btn">선택하기</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
export default Signup;
