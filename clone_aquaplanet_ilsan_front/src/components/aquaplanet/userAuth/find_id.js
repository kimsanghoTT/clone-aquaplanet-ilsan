import axios from "axios";
import React, { useState } from "react";

const FindIdModal = () => {
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
  });
  const [userId, setUserId] = useState("");

  const insertData = (e) => {
    const {name, value} = e.target;

    setMember(userData => ({
        ...userData,
        [name]:value
    }))
  }

  const searchId = async (e) => {
    e.preventDefault();
    console.log(member);
    try{
       const response = await axios.post("/aquaplanet/login/find/id", {
            memberName : member.memberName,
            memberPhone: member.memberPhone
       })
       console.log(response.data);
       if(response.data !== null){
            setUserId(response.data);
       }
       else{
        alert("일치하는 회원 정보를 찾을 수 없습니다.");
       }
    }
    catch{
        alert("에러 발생");
    }
  }

  return (
    <div className="find-id-modal">
        <div className="search-form">
      <form onSubmit={searchId}>
        <label htmlFor="memberName">이름</label>
        <input
          id="memberName"
          name="memberName"
          type="text"
          value={member.memberName}
          onChange={insertData}
        />
        <label htmlFor="memberPhone">전화번호</label>
        <input
          id="memberPhone"
          name="memberPhone"
          type="text"
          value={member.memberPhone}
          onChange={insertData}
        />
        <button type="submit">아이디 찾기</button>
      </form>
        </div>
    <div className="result-form">
        <p>회원님의 아이디는 {userId}입니다.</p>
    </div>
    </div>
  );
};
export default FindIdModal;
