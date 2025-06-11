import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import cityData from "./city_district.json";
import "../../../css/aquaplanet/signup.css";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberEmail: "",
    memberPw: "",
    memberSubEmail: "",
    memberRegionCity: "",
    memberRegionDistrict: "",
    memberName: "",
    memberPhone: "",
    preferredBranch:[]
  });
  const errMsg = {
    EMAIL_FORMAT: "올바른 이메일 형식을 입력해주세요",
    EMAIL_EXISTS: "이미 있는 이메일입니다",
    EMAIL_AVAILABLE: "사용 가능한 이메일을 입력해 주세요",
    PW_FORMAT_DESC_1: "비밀번호는 영문,숫자를 혼합한 8~13자리 또는",
    PW_FORMAT_DESC_2: "영문,숫자, 특수문자를 혼합한 10~13자리만 가능합니다",
    EMAIL_REQUIRED: "아이디는 필수 입력사항 입니다",
    PW_REQUIRED: "비밀번호는 필수 입력사항 입니다",
    EMAIL_DUPLE_CHECK_REQUIRED: "아이디 중복체크를 해주세요",
    PW_FORMAT:
      "비밀번호는 영문 숫자 포함 10~13자, 특수문자 포함 시 8~13자로 입력해 주세요",
    PW_CONFIRM: "비밀번호가 일치하지 않습니다",
    NAME_FORMAT: "올바른 이름을 작성해주세요",
    PHONE_FORMAT: "올바른 전화번호를 작성해주세요",
    PREFERRED_BRANCH: "최소 하나 이상의 선호지역을 선택해주세요",
    GENERIC_ERROR:
      "요청 처리 중 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의해주세요.",
  };
  const [dupleCheck, setDupleCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(true);
  const [pwCheck, setPwCheck] = useState(true);
  const [subEmailCheck, setSubEmailCheck] = useState(true);
  const [pwDoubleCheck, setPwDoubleCheck] = useState("");
  const [copyEmail, setCopyEmail] = useState(false);
  const [citySelectorOpen, setCitySelectorOpen] = useState(false);
  const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(null);
  const [cityLabel, setCityLabel] = useState("광역시/도");
  const [districtLabel, setDistrictLabel] = useState("시/군/구");
  const [availableDistrict, setAvailableDistrict] = useState([]);
  const [pwVision, setPwVision] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPreferredBranch, setSelectedPreferredBranch] = useState({
    여수: false,
    제주: false,
    일산: false,
    광교: false,
  });


  const cityRef = useRef(null);
  const districtRef = useRef(null);

  const emailPattern = useMemo(
    () =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co|kr|edu|gov|io|me)$/,
    []
  );
  const passwordPattern = useMemo(
    () =>
      /^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}|(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{10,13})$/,
    []
  );
  const namePattern = useMemo(() => /^[가-힣]{2,5}$/, []);
  const phonePattern = useMemo(() => /^010([0-9]{4})([0-9]{4})$/, []);

  useEffect(() => {
    const selectedCity = cityData.find(
      (data) => data.city === member.memberRegionCity
    );
    if (selectedCity) {
      setAvailableDistrict(selectedCity.district);
    } else {
      setAvailableDistrict([]);
    }
    setMember((prevSelection) => ({
      ...prevSelection,
      memberRegionDistrict: "",
    }));
  }, [member.memberRegionCity]);

  useEffect(() => {
    setIdCheck(
      member.memberEmail !== "" && emailPattern.test(member.memberEmail)
    );
    setPwCheck(member.memberPw !== "" && passwordPattern.test(member.memberPw));

    if (
      member.memberSubEmail !== "" &&
      !emailPattern.test(member.memberSubEmail)
    ) {
      setSubEmailCheck(false);
    } else {
      setSubEmailCheck(true);
    }
  }, [
    member.memberEmail,
    member.memberSubEmail,
    emailPattern,
    member.memberPw,
    passwordPattern,
  ]);

  useEffect(() => {
    if (copyEmail) {
      gsap.to(".sameEmailBtn span", { color: "#222", duration: 0.2 });
      document.querySelector(".sameEmailBtn").classList.add("active");
    } else {
      gsap.to(".sameEmailBtn span", { color: "#b4b4b4", duration: 0.2 });
      document.querySelector(".sameEmailBtn").classList.remove("active");
    }
  }, [copyEmail]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCitySelectorOpen(false);
      }
      if (districtRef.current && !districtRef.current.contains(e.target)) {
        setDistrictSelectorOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const insertData = (e) => {
    const { name, value } = e.target;

    setMember((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const duplicateCheck = async () => {
    if (member.memberEmail === "" || !emailPattern.test(member.memberEmail)) {
      alert(errMsg.EMAIL_FORMAT);
      return;
    }

    const response = await axios.get("/aquaplanet/duplicate", {
      params: {
        memberEmail: member.memberEmail,
      },
    });

    if (response.data === 0) {
      setDupleCheck(true);
      alert("사용 가능한 이메일입니다.");
    } else {
      setDupleCheck(false);
      alert(errMsg.EMAIL_EXISTS);
      return;
    }
  };

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const usingSameEmail = () => {
    setCopyEmail((prev) => {
      const newState = !prev;

      console.log(newState);

      setMember((userData) => ({
        ...userData,
        memberSubEmail: newState ? member.memberEmail : "",
      }));

      return newState;
    });
  };

  const openBtn = (number) => {
    switch (number) {
      case 1:
        setCitySelectorOpen(!citySelectorOpen);
        break;
      case 2:
        setDistrictSelectorOpen(!districtSelectorOpen);
        break;
      default:
        break;
    }
  };

  const selection = (e) => {
    const value = e.target.getAttribute("data-value");
    const field = e.target.getAttribute("datatype");

    setMember((userData) => ({
      ...userData,
      [field]: value,
    }));
  };

  const updateSelectedLabel = (index, type) => {
    if (type === "city") {
      setSelectedCityIndex(index);
      setCityLabel(cityData[index].city);
      setCitySelectorOpen(!citySelectorOpen);
      // 시/군/구 박스 초기화
      setSelectedDistrictIndex(null);
      setDistrictLabel("시/군/구");
    } else if (type === "district") {
      setSelectedDistrictIndex(index);
      setDistrictLabel(availableDistrict[index]);
      setDistrictSelectorOpen(!districtSelectorOpen);
    }
  };

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
      const response = await axios.post("/aquaplanet/signup", finalData);
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
                  onChange={(e) => setPwDoubleCheck(e.target.value)}
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
                      <li className="city-item">광역시/도</li>
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
