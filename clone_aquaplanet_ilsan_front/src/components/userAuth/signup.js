import axios from "axios";
import React, { useState } from "react";
import "../../css/signup.css";

const Signup = () => {
  const [member, setMember] = useState({
    memberEmail : '',
	memberPw : '',
	memberSubEmail : '',
	memberRegionCity : '',
	memberRegionDistrict : ''
  });
  //const [idCheck, setIdCheck] = useState(null);

const insertData = (e) => {
    const {name, value} = e.target;

    console.log(value);

    setMember((userData) => ({
        ...userData,
        [name] : value
    }))
  }

  console.log(member);

  const submitSignupData = async (e) => {
    e.preventDefault();
    console.log(member);
    await axios.post('http://localhost:9000/aquaplanet/signup', member);
  }

  return (
    <section>
      <form onSubmit={submitSignupData}>
        <span>이메일</span>
        <input type="email" name="memberEmail" value={member.memberEmail} onChange={insertData}/>
        <span>비밀번호</span>
        <input type="password" name="memberPw" value={member.memberPw} onChange={insertData}/>
        <span>수신 받을 이메일</span>
        <input type="email" name="memberSubEmail" value={member.memberSubEmail} onChange={insertData}/>
        <span>거주지</span>
        <select name="memberRegionCity" value={member.memberRegionCity} onChange={insertData}>
          <option>광역시/도</option>
          <option>강원</option>
          <option>경기</option>
          <option>경남</option>
          <option>경북</option>
          <option>광주</option>
          <option>대구</option>
          <option>대전</option>
          <option>부산</option>
          <option>서울</option>
          <option>세종자치시</option>
          <option>울산</option>
          <option>인천</option>
          <option>전남</option>
          <option>전북</option>
          <option>제주</option>
          <option>충남</option>
          <option>충북</option>
        </select>
        <span>거주지 세부</span>
        <select name="memberRegionDistrict" value={member.memberRegionDistrict} onChange={insertData}>
          <option>시/군/구</option>
          <option>강화군</option>
          <option>계양구</option>
          <option>미추홀구</option>
          <option>남동구</option>
          <option>동구</option>
          <option>부평구</option>
          <option>서구</option>
          <option>연수구</option>
          <option>옹진군</option>
          <option>중구</option>
        </select>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
};
export default Signup;
