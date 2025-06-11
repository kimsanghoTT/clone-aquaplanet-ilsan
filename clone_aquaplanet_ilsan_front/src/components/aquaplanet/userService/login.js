import React, { useContext, useState } from "react";
import "../../../css/aquaplanet/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FindIdModal from "./find_id";
import FindPwModal from "./find_pw";
import LoginContext from "../../LoginContext";

const Login = () => {
  const {setLoginMember} = useContext(LoginContext);

  const navigate = useNavigate();
  const [OpenModal, setOpenModal] = useState({
    findIdModal: false,
    findPwModal: false,
  });
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
      const response = await axios.post("/aquaplanet/login", member);

      if (response.data && response.data.result) {
        setLoginMember(response.data.loginMember);
        navigate("/");
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch {
      alert("로그인에 오류가 발생했습니다.");
    }
  };

  const handleModal = (type) => {
    setOpenModal((modal) => ({
      ...modal,
      [type]: !modal[type],
    }));
  };

  const closeModal = (type) => {
    setOpenModal(modal => ({
      ...modal,
      [type]: false,
    }));
  };

  const switchToPw = () => {
    closeModal("findIdModal");
    setOpenModal(modal => ({
      ...modal,
      findPwModal:true
    }))
  }

  return (
    <>
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

              <div
                className="login-form-content form-content03"
                style={{ marginTop: "40px" }}
              >
                <button className="login-btn" type="submit">
                  <span>로그인</span>
                </button>
                <div className="additional-service">
                  <button
                    type="button"
                    onClick={() => handleModal("findIdModal")}
                  >
                    아이디 찾기
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModal("findPwModal")}
                  >
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
          </div>
        </div>
      </section>
      {OpenModal["findIdModal"] && (
        <FindIdModal
          onClose={() => closeModal("findIdModal")}
          switchToPw={switchToPw}
        />
      )}
      {OpenModal["findPwModal"] && (
        <FindPwModal onClose={() => closeModal("findPwModal")} />
      )}
    </>
  );
};
export default Login;
