import React, { useContext } from "react";
import "../../../css/aquaplanet/mypage.css";
import LoginContext from "../../LoginContext";

const MyPage = () => {
  const { loginMember } = useContext(LoginContext);

  if(!loginMember){
    return;
  }

  console.log(loginMember);

  return (
    <section className="member-mypage">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>설정</p>
            <p>
              안녕하세요! <em>{loginMember.memberName}</em>님 아쿠아플라넷에 <br />
              오신것을 환영합니다.
            </p>
          </div>
          <div className="member-mypage-content">
            <button>로그아웃</button>
            <div className="mypage-setting-account">
              <span>계정관리</span>
              <ul>
                <li>
                  <a href="/aquaplanet/member/mypage">내 정보 관리</a>
                  <span>SNS로그인 연동 설정</span>
                </li>
                <li></li>
              </ul>
            </div>
            <div className="mypage-setting-branch">
              <span>선호지역 설정</span>
              <form className="branch-form">
                <label htmlFor="63">63</label>
                <input id="63" value="63"/>
                <label htmlFor="여수">여수</label>
                <input id="여수" value="여수"/>
                <label htmlFor="제주">제주</label>
                <input id="제주" value="제주"/>
                <label htmlFor="일산">일산</label>
                <input id="일산" value="일산"/>
                <label htmlFor="광교">광교</label>
                <input id="광교" value="광교"/>
              </form>
              <span>계정관리</span>
              <div>
                <span>즐겨찾는 결제수단</span>
                <span className="payment-selector"></span>
                <ul>
                  <li><span><span>신용카드</span></span></li>
                </ul>
              </div>
            </div>
            <div className="mypage-setting-cs">
              <span>고객지원</span>
              <button>이용약관</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyPage;
