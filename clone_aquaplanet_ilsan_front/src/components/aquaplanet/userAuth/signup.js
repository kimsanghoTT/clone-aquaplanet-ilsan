import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import cityData from "./city_district.json";
import "../../../css/aquaplanet/signup.css";

const Signup = () => {
  const [member, setMember] = useState({
    memberEmail: "",
    memberPw: "",
    memberSubEmail: "",
    memberRegionCity: "",
    memberRegionDistrict: "",
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
    PW_FORMAT: "비밀번호는 영문 숫자 포함 10~13자, 특수문자 포함 시 8~13자로 입력해 주세요"
  };
  const [dupleCheck, setDupleCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [pwCheck, setPwCheck] = useState(true);
  const emailPattern = useMemo(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co|kr|edu|gov|io|me)$/, []) ;
  const passwordPattern =  useMemo (() => /^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}|(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{10,13})$/, []);

  useEffect(() => {
    const selectedCity = cityData.find(data => data.city === member.memberRegionCity);
    if(selectedCity){
      setSelectedDistrict(selectedCity.district);
    }
    else{
      setSelectedDistrict([]);
    }
    setMember(prevSelection => ({
      ...prevSelection,
      memberRegionDistrict: ""
    }))
  },[member.memberRegionCity])

  useEffect(() => {
    setIdCheck(member.memberEmail !== '' && emailPattern.test(member.memberEmail));
    setPwCheck(member.memberPw !== '' && passwordPattern.test(member.memberPw));
  },[member.memberEmail, emailPattern, member.memberPw, passwordPattern]);

  const insertData = (e) => {
    const { name, value } = e.target;

    setMember((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const duplicateCheck = async () => {
    if(member.memberEmail === '' || !emailPattern.test(member.memberEmail)){
      alert(errMsg.EMAIL_FORMAT);
      return;
    }

    const response = await axios.get("/aquaplanet/duplicate", {
      params: {
        memberEmail: member.memberEmail
      }
    })

    if(response.data === 0) {
      setDupleCheck(true);
      alert("사용 가능한 이메일입니다.");
    }
    else{
      setDupleCheck(false);
      alert(errMsg.EMAIL_EXISTS);
      return 0;
    }
  };

  const submitSignupData = async (e) => {
    e.preventDefault();
    
    if(!idCheck){
      alert(member.memberEmail === '' ? errMsg.EMAIL_REQUIRED : errMsg.EMAIL_FORMAT);
      return;
    }

    if(!pwCheck){
      alert(member.memberPw === '' ? errMsg.PW_REQUIRED : errMsg.PW_FORMAT);
      return;
    }

    if(!dupleCheck){
      alert(errMsg.EMAIL_DUPLE_CHECK_REQUIRED);
      return;
    }

    try{
    await axios.post("/aquaplanet/signup", member);

    }catch{
      alert("알 수 없는 에러가 발생했습니다. 나중에 다시 시도해주세요");
    }
  };

  return (
    <section className="signup-member">
      <div className="signup-member-title">
        <p>회원가입</p>
        <p>자주 쓰는 메일로 시작해 보세요</p>
      </div>
      <form className="signup-form" onSubmit={submitSignupData}>
        <label htmlFor="memberEmail">아이디</label>
        <button className="duplicateCheckBtn" type="button" onClick={duplicateCheck} value={member.memberEmail}>중복체크</button>
        <input
          id="memberEmail"
          type="text"
          name="memberEmail"
          value={member.memberEmail}
          onChange={insertData}
          placeholder="아이디로 사용하실 이메일을 입력해주세요"
        />
        <span className={`email-err-msg ${idCheck ? "" : "err-on"}`}>{errMsg.EMAIL_FORMAT}</span>
        <label htmlFor="memberPw">비밀번호</label>
        <input
          id="memberPw"
          type="password"
          name="memberPw"
          value={member.memberPw}
          onChange={insertData}
          placeholder="비밀번호를 입력해주세요"
        />
        <span className={`pw-err-msg ${pwCheck ? "" : "err-on"}`}>
          <p>{errMsg.PW_FORMAT_DESC_1}</p>
          <p>{errMsg.PW_FORMAT_DESC_2}</p>
        </span>
        <label htmlFor="memberSubEmail">추가 이메일(선택)</label>
        <input
          id="memberSubEmail"
          type="text"
          name="memberSubEmail"
          value={member.memberSubEmail}
          onChange={insertData}
          placeholder="소식을 받아보실 이메일 주소를 입력해주세요"
        />
        <label>거주지역(선택)</label>
        <select
          name="memberRegionCity"
          value={member.memberRegionCity}
          onChange={insertData}
        >
          <option>광역시/도</option>
          {cityData.map((data, index) => (
            <option key={index}>{data.city}</option>
          ))}
        </select>
        <select
          name="memberRegionDistrict"
          value={member.memberRegionDistrict}
          onChange={insertData}
        >
          <option>시/군/구</option>
          {selectedDistrict.map((district, index) => (
            <option key={index}>{district}</option>
          ))}
        </select>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
};
export default Signup;
