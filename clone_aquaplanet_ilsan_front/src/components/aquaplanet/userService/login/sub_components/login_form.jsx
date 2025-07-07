import React, { useContext, useState } from "react";
import LoginContext from "../../../../LoginContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const LoginForm = ({ handleModal }) => {
  const {setLoginMember} = useContext(LoginContext);
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberEmail: "",
    memberPw: "",
  });

  const loginData = (e) => {
    const { name, value } = e.target;

    setMember((loginData) => ({
      ...loginData,
      [name]: value,
    }));
  };

  const memberLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/aquaplanet/login", member);

      if (response.data && response.data.result) {
        setLoginMember(response.data.loginMember);
        navigate("/aquaplanet/mall");
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch {
      alert("로그인에 오류가 발생했습니다.");
    }
  };

  return (
    <form className="login-form" onSubmit={memberLogin}>
      <div className="login-form-content form-content01">
        <input
          id="memberEmail"
          type="text"
          name="memberEmail"
          value={member.memberEmail}
          placeholder="아이디 또는 이메일"
          onChange={loginData}
        />
      </div>
      <div className="login-form-content form-content02">
        <input
          id="memberPw"
          type="password"
          name="memberPw"
          value={member.memberPw}
          placeholder="비밀번호"
          onChange={loginData}
        />
      </div>

      <div
        className="login-form-content form-content03"
        style={{ marginTop: "40px" }}
      >
        <button className="login-btn" type="submit">
          <span>로그인</span>
        </button>
        <div className="additional-service">
          <button type="button" onClick={() => handleModal("findIdModal")}>
            아이디 찾기
          </button>
          <button type="button" onClick={() => handleModal("findPwModal")}>
            비밀번호 찾기
          </button>
          <a href="/aquaplanet/member/signup">회원가입</a>
        </div>
      </div>
      <div className="social-login">
        <span>SNS계정으로 로그인</span>
        <div className="social-list">
          <button>
            <span>카카오톡으로 시작하기</span>
          </button>
          <button>
            <span>네이버로 시작하기</span>
          </button>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
