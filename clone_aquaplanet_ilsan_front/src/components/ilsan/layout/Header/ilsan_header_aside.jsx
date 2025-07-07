import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../../../LoginContext";

const AsideSection = ({isHovered}) => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [joinOpen, setJoinOpen] = useState(false);

  const toggleJoinMenu = () => setJoinOpen(!joinOpen);

  const handleLogout = () => {
    setLoginMember(null);
    localStorage.removeItem("loginMember");
  };

  useEffect(() => {
    if(!isHovered){
      setJoinOpen(false);
    }
  },[isHovered])

  return (
    <div className="aside">
      <div className="log-in">
        <button onClick={toggleJoinMenu} type="button">
          <span className="ico"></span>
          <span className="log-in-text">
            {loginMember ? `${loginMember.memberName}님` : "Log In"}
          </span>
          <span
            className="ico2"
            style={{ transform: joinOpen ? "rotate(180deg)" : "none" }}
          ></span>
        </button>
        <div className={`join ${joinOpen ? "show" : ""}`}>
          {loginMember ? (
            <>
              <a href="/aquaplanet/member/mypage/setting">
                <span className="text-join">My Page</span>
              </a>
              <span className="header-log-out" onClick={handleLogout}>
                <span className="text-join">Log Out</span>
              </span>
            </>
          ) : (
            <>
              <a
                href="/aquaplanet/member/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-join">Log In</span>
              </a>
              <a
                href="/aquaplanet/member/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-join">회원가입</span>
              </a>
            </>
          )}
        </div>
      </div>
      <div className="ticket-box">
        <a href="/aquaplanet/mall" target="_blank" rel="noopener noreferrer">
          <span className="ico"></span>
          <span className="ticket-text">티켓구매</span>
        </a>
      </div>
    </div>
  );
};

export default AsideSection;