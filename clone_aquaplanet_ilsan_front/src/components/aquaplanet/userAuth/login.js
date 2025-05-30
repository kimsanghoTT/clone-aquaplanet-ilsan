import React, { useState } from "react";
import "../../../css/aquaplanet/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberEmail:"",
    memberPw:""
  })

  const loginData = (e) => {
    const {name, value} = e.target;

    setMember(loginData => ({
        ...loginData,
        [name]:value
    }))
  }

  const memberLogin = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post("/aquaplanet/login", member);
        if (response.data && response.data.success) { 
          alert("로그인 성공");
          navigate("/");
        } 
        else {
          alert(response.data.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    }catch{
        alert("로그인에 오류가 발생했습니다.");
    }
  }

  return (
    <section className="member-login">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
        <div className="member-login-box">
          <div className="member-login-title">
            <p>로그인</p>
          </div>
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

            <div className="login-form-content form-content03" style={{marginTop: "40px"}}>
              <button className="login-btn" type="submit">
                <span>로그인</span>
              </button>
              <div className="additional-service">
                <a href="/">아이디 찾기</a>
                <a href="/">비밀번호 찾기</a>
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
        </div>
      </div>
    </section>
  );
};
export default Login;
