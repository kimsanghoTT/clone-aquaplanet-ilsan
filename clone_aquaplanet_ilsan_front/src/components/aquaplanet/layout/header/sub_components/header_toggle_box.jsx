import React from "react";

const HeaderToggleBox = ({toggleBoxOpen, navigationList, loginMember, logout}) => {

  return (
    <div
      className={`aquaplanet-header-toggle-box ${toggleBoxOpen ? "active" : ""}`}
    >
      <div className="aquaplanet-header-layout01">
        <menu className="aquaplanet-header-navigation">
          <ul className="aquaplanet-header-navigation-list">
            {navigationList.map((item, index) => (
              <li className="navi-item" key={index}>
                <a href={loginMember ? item.url : "/aquaplanet/member/login"}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <div className="navigation-crumbs">
              <span>고객센터</span>
              <span>1833 - 7001</span>
            </div>
          </div>
        </menu>
      </div>
      <div className="aquaplanet-header-layout02">
        <div className="navigation-display">
          <div className="navigation-display-message">
            {loginMember ? (
              <p>
                안녕하세요! <span>{loginMember.memberName}</span>님 아쿠아플라넷에 <br />
                오신것을 환영합니다
              </p>
            ) : (
              <p>
                안녕하세요! 바다가 숨쉬는 여기는 <br />
                <span>아쿠아플라넷</span>입니다
              </p>
            )}
          </div>
          <div className="navigation-display-function">
            {loginMember ? (
              <button onClick={logout}>로그아웃</button>
            ) : (
              <>
                <a href="/aquaplanet/member/login">로그인하기</a>
                <a href="/aquaplanet/member/signup">회원가입하기</a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderToggleBox;
