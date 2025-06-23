import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import cityData from "../city_district.json";
import "../../../../css/aquaplanet/mypage_account.css";
import LoginContext from "../../../LoginContext";
import axios from "axios";

const msg = {
  PW_FORMAT1: "영문 포함 10~13자",
  PW_FORMAT2: "특수문자 포함 8~13자",
  PW_CHANGE: "비밀번호가 변경되었습니다.",
  PW_FORMAT:
    "비밀번호는 영문 숫자 포함 10~13자, 특수문자 포함 시 8~13자로 입력해 주세요",
  PW_CONFIRM: "비밀번호가 일치하지 않습니다",
  USED_PW: "이전과 다른 비밀번호를 작성해주세요",
  EMAIL_FORMAT: "올바른 이메일 형식을 입력해주세요",
  EMAIL_AVAILABLE: "사용 가능한 이메일을 입력해 주세요",
  NAME_FORMAT: "올바른 이름을 작성해주세요",
  PHONE_FORMAT: "올바른 전화번호를 작성해주세요",
  BIRTH_FORMAT:"올바른 생년월일을 입력해주세요",
  GENERIC_ERROR:
    "요청 처리 중 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의해주세요.",
};

const AccountUpdate = ({ utilType, onCancel }) => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [pwVision, setPwVision] = useState(false);
  const [modifyPw, serModifyPw] = useState("");
  const [modifyPwDoubleCheck, serModifyPwDoubleCheck] = useState("");
  const [pwCheck, setPwCheck] = useState(true);
  const [citySelectorOpen, setCitySelectorOpen] = useState(false);
  const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(null);
  const [cityLabel, setCityLabel] = useState(loginMember?.memberRegionCity || "광역시/도");
  const [districtLabel, setDistrictLabel] = useState(loginMember?.memberRegionDistrict || "시/군/구");
  const [availableDistrict, setAvailableDistrict] = useState([]);
  const [modifyStep, setModifyStep] = useState(null);
  const [modifyProfile, setModifyProfile] = useState({
    memberNo: loginMember.memberNo,
    memberName: loginMember.memberName || "",
    memberPhone: loginMember.memberPhone || "",
    memberBirth: loginMember.memberBirth || "",
    memberSubEmail: loginMember.memberSubEmail || "",
    memberRegionCity: loginMember.memberRegionCity || "",
    memberRegionDistrict: loginMember.memberRegionDistrict || "",
  });
  const [exitCheckPw, setExitCheckPw] = useState("");
  const [checkExitTerms, setCheckExitTerms] = useState(false);

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
  const birthPattern = useMemo(() => /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/ ,[]) ;

  useEffect(() => {
    const selectedCity = cityData.find(
      (data) => data.city === modifyProfile.memberRegionCity
    );
    if (selectedCity) {
      setAvailableDistrict(selectedCity.district);
    } else {
      setAvailableDistrict([]);
    }
    setModifyProfile((prevSelection) => ({
      ...prevSelection,
      memberRegionDistrict: "",
    }));
  }, [modifyProfile.memberRegionCity]);

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

  useEffect(() => {
    setPwCheck(modifyPw !== "" && passwordPattern.test(modifyPw));
  }, [modifyPw, passwordPattern]);

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const submitModifyPw = async (e) => {
    e.preventDefault();

    if (!passwordPattern.test(modifyPw)) {
      alert(msg.PW_FORMAT);
      return;
    }
    if (modifyPw !== modifyPwDoubleCheck) {
      alert(msg.PW_CONFIRM);
      return;
    }

    try {
      const response = await axios.post("/aquaplanet/login/find/updatePw", {
        memberEmail: loginMember.memberEmail,
        memberPw: modifyPw,
      });
      if (response.data.result === "SUCCESS") {
        alert(msg.PW_CHANGE);
        onCancel();
        setLoginMember({
          ...loginMember,
          memberPw: modifyPw,
        });
      } else if (response.data.result === "USED_PW") {
        alert(msg.USED_PW);
        return;
      } else {
        alert(msg.UNKNOWN_ERR);
        return;
      }
    } catch {
      alert(msg.UNKNOWN_ERR);
      return;
    }
  };

  const handleProfile = (e) => {
    const { name, value } = e.target;

    setModifyProfile((before) => ({
      ...before,
      [name]: value,
    }));
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

    setModifyProfile((userData) => ({
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

  const resetRegionSelection = (e) => {
    setModifyProfile((userData) => ({
      ...userData,
      memberRegionCity: "",
      memberRegionDistrict: "",
    }));
    setCityLabel("광역시/도");
    setDistrictLabel("시/군/구");
    setSelectedCityIndex(null);
    setSelectedDistrictIndex(null);
    setCitySelectorOpen(false);
    setDistrictSelectorOpen(false);
    setAvailableDistrict([]);
  }

  const completeModifyProfile = (e) => {
    if(e === 1){
     setModifyStep("complete");
    }
    if(e === 2){
      setModifyStep(null);
      onCancel();
    }
  }

  const submitModifyProfile = async (e) => {
    e.preventDefault();

    if (!namePattern.test(modifyProfile.memberName)) {
      alert(msg.NAME_FORMAT);
      return;
    }
    if (!phonePattern.test(modifyProfile.memberPhone)) {
      alert(msg.PHONE_FORMAT);
      return;
    }
    if(modifyProfile.memberSubEmail && !emailPattern.test(modifyProfile.memberSubEmail)){
      alert(msg.EMAIL_FORMAT);
      return;
    }
    if(modifyProfile.memberBirth && !birthPattern.test(modifyProfile.memberBirth)){
      alert(msg.BIRTH_FORMAT);
      return;
    }
    
    try {
      const response = await axios.post("/aquaplanet/mypage/modifyProfile", modifyProfile);
      if(response.status === 200){
        setLoginMember({
          ...loginMember,
          memberName: modifyProfile.memberName,
          memberPhone: modifyProfile.memberPhone,
          memberBirth: modifyProfile.memberBirth,
          memberSubEmail: modifyProfile.memberSubEmail,
          memberRegionCity: modifyProfile.memberRegionCity,
          memberRegionDistrict: modifyProfile.memberRegionDistrict
        })
      }
    } catch {
      alert(msg.GENERIC_ERROR);
    }
  };

  const handleCheckExitTerms = () => {
    setCheckExitTerms(!checkExitTerms);
  }

  const submitExitMember = async (e) => {
    e.preventDefault();

    if(exitCheckPw !== loginMember.memberPw){
      alert(msg.PW_CONFIRM);
      return;
    }

    try{
      const response = await axios.delete("/aquaplanet/mypage/delete");
    }catch{

    }
  }

  return (
    <>
      {utilType === "updatePw" && (
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>비밀번호 변경</p>
            <p style={{ marginBottom: "35px" }}>
              비밀번호는 영문, 숫자가 포함된 10~13자리 <br />
              또는 영문, 숫자, 특수문자가 포함된 8~13자리로 <br />
              설정이 가능합니다.
            </p>
          </div>
          <div className="member-mypage-content member-update-pw">
            <form onSubmit={submitModifyPw}>
              <div className="form-item">
                <label htmlFor="modifyPw" style={{ fontSize: "14px" }}>
                  새 비밀번호
                </label>
                <button
                  type="button"
                  className={`pw-vision ${pwVision ? "on" : ""}`}
                  onClick={pwVisionOn}
                >
                  <span className="ico1"></span>
                </button>
                <div className="pw-modify-entryBox">
                  <input
                    id="modifyPw"
                    type={pwVision ? "text" : "password"}
                    value={modifyPw}
                    onChange={(e) => serModifyPw(e.target.value)}
                    required
                    placeholder="새로운 비밀번호를 입력해 주세요"
                  />
                  <div
                    className={`modify-errMsg-box ${!pwCheck && modifyPw ? "err-on" : ""}`}
                  >
                    <span className="modify-errMsg">{msg.PW_FORMAT1}</span>
                    <span className="modify-errMsg">{msg.PW_FORMAT2}</span>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="newPwDoubleCheck">새 비밀번호 확인</label>
                <input
                  id="newPwDoubleCheck"
                  onChange={(e) => serModifyPwDoubleCheck(e.target.value)}
                  value={modifyPwDoubleCheck}
                  type="password"
                  required
                />
              </div>
              <div className="mypage-modify-btn-area">
                <button>비밀번호 변경</button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {utilType === "updateProfile" && (
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>내 정보 수정</p>
            <p style={{ margin: 0 }}></p>
          </div>
          <div className="member-mypage-content member-update-profile">
            <form onSubmit={submitModifyProfile}>
              <div className="profile-form-wrapper">
                <div className="modify-form-content">
                  <label htmlFor="memberName">이름</label>
                  <input
                    name="memberName"
                    id="memberName"
                    value={modifyProfile.memberName}
                    onChange={handleProfile}
                  />
                </div>
                <div className="modify-form-content">
                  <label htmlFor="memberPhone">연락처</label>
                  <input
                    name="memberPhone"
                    id="memberPhone"
                    value={modifyProfile.memberPhone}
                    onChange={handleProfile}
                    placeholder="'-'빼고 입력"
                  />
                </div>
                <div className="modify-form-content">
                  <label htmlFor="memberBirth">생년월일</label>
                  <input
                    name="memberBirth"
                    id="memberBirth"
                    value={modifyProfile.memberBirth}
                    onChange={handleProfile}
                    placeholder="yyyy.mm.dd"
                  />
                </div>
                <div className="modify-form-content">
                  <label htmlFor="memberSubEmail">이메일</label>
                  <input
                    name="memberSubEmail"
                    id="memberSubEmail"
                    value={modifyProfile.memberSubEmail}
                    onChange={handleProfile}
                  />
                </div>
                <div className="modify-form-content">
                  <label>거주지역</label>
                  <div>
                  <select
                    name="memberRegionCity"
                    value={modifyProfile.memberRegionCity}
                    onChange={handleProfile}
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
                    value={modifyProfile.memberRegionDistrict}
                    onChange={handleProfile}
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
              </div>
              <div className="mypage-modify-btn-area">
                <button onClick={() => completeModifyProfile(1)}>변경내용 저장</button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </div>
            </form>
            {modifyStep === "complete" && (
            <div className="modal-wrapper">
              <div className="modal-container">
                <button
                  className="modal-close-btn"
                  type="button"
                  onClick={() => completeModifyProfile(2)}
                ></button>
                  <div className="result-form">
                    <div className="form-content">
                      <span className="form-title">
                        내 정보가 정상적으로 <br/>
                        수정되었습니다.
                        </span>
                      <p>
                        아래 확인 버튼을 눌러주세요!
                      </p>
                    </div>
                    <div className="modal-button-list">
                      <button type="button" 
                      onClick={() => completeModifyProfile(2)} 
                      style={{backgroundColor: "#2771f1", color: "#fff", width: "100%"}}>
                        확인
                      </button>
                    </div>
                  </div>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
      {utilType === "deleteAccount" && (
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>회원탈퇴</p>
            <p className="mypage-exit-title">
              정말 아쿠아플라넷 회원에서 탈퇴하시겠어요?
            </p>
            <p className="mypage-exit-message">
            탈퇴하시면 온라인에서 구매하신 티켓을 확인하실 수 없습니다.
            그래도 탈퇴하시겠습니까?
            </p>
          </div>
          <div className="member-mypage-content member-exit">
            <form onSubmit={submitExitMember}>
              <div className="exit-form-wrapper">
                <div className={`member-exit-check ${checkExitTerms ? "agree" : ""}`} onClick={handleCheckExitTerms}>
                  <span>내용을 이해했으며, 탈퇴 후 온라인에서 티켓 및 쿠폰, 쿠폰 교환권, 스탬프 등 서비스를 통해 획득한 내용들을 확인할 수 없음에 동의합니다.</span>
                  <br/>
                  <span>※ 카카오 계정으로 가입한 경우 ‘카카오 설정 → 카카오 계정 → 연결된 서비스 관리’에서 삭제할 수 있습니다.</span>
                </div>
                <div className="member-exit-check-pw">
                  <label htmlFor="memberPw">비밀번호</label>
                  <input type="password" value={exitCheckPw} onChange={(e) => setExitCheckPw(e.target.value)} 
                  placeholder="비밀번호를 입력해 주세요"/>
                </div>
              </div>
              <div className="mypage-modify-btn-area">
                <button>회원 탈퇴</button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AccountUpdate;
