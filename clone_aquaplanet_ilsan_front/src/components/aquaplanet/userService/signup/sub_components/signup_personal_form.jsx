import { useState } from "react";
import { errMsg } from "../data/err_msg";
import cityData from "../../common_data/city_district.json";

const SignupPersonalForm = ({
  validateBeforeSubmit,
  setStep,
  member,
  insertData,
  emailDuplicateCheck,
  idCheck,
  pwCheck,
  pwDoubleCheck,
  handlePwDoubleCheck,
  usingSameEmail,
  subEmailCheck,
  cityRef,
  openRegionSelectorBtn,
  cityLabel,
  citySelectorOpen,
  resetCitySelection,
  selectedCityIndex,
  selectCity,
  districtRef,
  districtLabel,
  districtSelectorOpen,
  resetDistrictSelection,
  availableDistrict,
  selectedDistrictIndex,
  selectDistrict,
}) => {
  const [pwVision, setPwVision] = useState(false);

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const submitPersonalData = async (e) => {
    e.preventDefault();
    const validation = validateBeforeSubmit();

    if (validation) {
      setStep(2);
    } else {
      return;
    }
  };

  return (
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
            value={member.memberName}
            onChange={insertData}
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div className="signup-form-content form-content02">
          <label htmlFor="memberPhone">휴대폰 번호</label>
          <input
            id="memberPhone"
            type="text"
            name="memberPhone"
            value={member.memberPhone}
            onChange={insertData}
            placeholder="휴대폰 번호를 입력해주세요. '-'빼고 입력"
          />
        </div>

        <div className="signup-form-content form-content03">
          <label htmlFor="memberEmail">아이디</label>
          <button
            className="duplicateCheckBtn"
            type="button"
            onClick={emailDuplicateCheck}
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
            onChange={handlePwDoubleCheck}
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
          <div className="region-selector">
            <div ref={cityRef} className="select-city-box">
              <span
                className="select-city"
                ref={cityRef}
                onClick={() => openRegionSelectorBtn(1)}
              >
                <span>{cityLabel}</span>
                <span className={`ico ${citySelectorOpen ? "on" : ""}`}></span>
              </span>
              <ul
                style={
                  citySelectorOpen ? { display: "block" } : { display: "none" }
                }
              >
                <li className="city-item" onClick={resetCitySelection}>
                  광역시/도
                </li>
                {cityData.map((data, index) => (
                  <li
                    className={`city-item ${selectedCityIndex === index ? "on" : ""}`}
                    key={index}
                    data-value={data.city}
                    datatype="memberRegionCity"
                    onClick={() => selectCity(index)}
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
                onClick={() => openRegionSelectorBtn(2)}
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
                <li className="district-item" onClick={resetDistrictSelection}>
                  시/군/구
                </li>
                {availableDistrict.map((district, index) => (
                  <li
                    className={`district-item ${selectedDistrictIndex === index ? "on" : ""}`}
                    key={index}
                    data-value={district}
                    datatype="memberRegionDistrict"
                    onClick={() => selectDistrict(index)}
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
  );
};
export default SignupPersonalForm;
