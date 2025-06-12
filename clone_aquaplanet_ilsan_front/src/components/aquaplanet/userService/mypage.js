import React, { useContext, useState } from "react";
import "../../../css/aquaplanet/mypage.css";
import LoginContext from "../../LoginContext";

const MyPage = () => {
  const { loginMember } = useContext(LoginContext);
  const [selectedPayMethod, setSelectedPayMethod] = useState('신용카드');
  const [payMethodListOpen, setPayMethodListOpen] = useState(false);
  const [selectedPreferredBranch, setSelectedPreferredBranch] = useState({
    63: false,
    여수: false,
    제주: false,
    일산: false,
    광교: false,
  });
  const payMethod = ["신용카드", "계좌이체", "휴대폰결제", "네이버페이"];

  const preferredBranchSelection = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setSelectedPreferredBranch((branch) => ({
      ...branch,
      [value]: checked,
    }));
  };

  const handlePayMethodList = () => {
    setPayMethodListOpen(!payMethodListOpen);
  }

  const payMethodSelection = (option) => {
    setSelectedPayMethod(option);
    setPayMethodListOpen(false);
  }

  if (!loginMember) {
    return;
  }


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
              안녕하세요! <em>{loginMember.memberName}</em>님 아쿠아플라넷에{" "}
              <br />
              오신것을 환영합니다.
            </p>
          </div>
          <div className="member-mypage-content">
            <button className="logout-btn">로그아웃</button>
            <div className="mypage-setting-account">
              <span className="mypage-section-title">계정관리</span>
              <ul>
                <li>
                  <a href="/aquaplanet/member/mypage">내 정보 관리</a>
                </li>
                <li>
                  <a href="/aquaplanet/member/mypage">SNS로그인 연동 설정</a>
                </li>
              </ul>
            </div>
            <div className="mypage-setting-branch">
              <span className="mypage-section-title">선호지역 설정</span>
              <form className="branch-form">
                <label
                  className={selectedPreferredBranch["63"] ? "on" : ""}
                  htmlFor="63"
                >
                  63
                </label>
                <input
                  checked={selectedPreferredBranch["63"] || false}
                  type="checkbox"
                  id="63"
                  value={"63"}
                  onChange={preferredBranchSelection}
                />
                <label
                  className={selectedPreferredBranch["여수"] ? "on" : ""}
                  htmlFor="여수"
                >
                  여수
                </label>
                <input
                  checked={selectedPreferredBranch["여수"] || false}
                  type="checkbox"
                  id="여수"
                  value={"여수"}
                  onChange={preferredBranchSelection}
                />

                <label
                  className={selectedPreferredBranch["제주"] ? "on" : ""}
                  htmlFor="제주"
                >
                  제주
                </label>
                <input
                  checked={selectedPreferredBranch["제주"] || false}
                  type="checkbox"
                  id="제주"
                  value={"제주"}
                  onChange={preferredBranchSelection}
                />

                <label
                  className={selectedPreferredBranch["일산"] ? "on" : ""}
                  htmlFor="일산"
                >
                  일산
                </label>
                <input
                  checked={selectedPreferredBranch["일산"] || false}
                  type="checkbox"
                  id="일산"
                  value={"일산"}
                  onChange={preferredBranchSelection}
                />

                <label
                  className={selectedPreferredBranch["광교"] ? "on" : ""}
                  htmlFor="광교"
                >
                  광교
                </label>
                <input
                  checked={selectedPreferredBranch["광교"] || false}
                  type="checkbox"
                  id="광교"
                  value={"광교"}
                  onChange={preferredBranchSelection}
                />
              </form>
              <span>계정관리</span>
              <div className="mypage-pay-method">
                <span>즐겨찾는 결제수단</span>
                <span className={`pay-method-display ${payMethodListOpen ? "on" : ""}`} onClick={handlePayMethodList}>{selectedPayMethod}</span>
                <select defaultValue="신용카드">
                  <option>신용카드</option>
                  <option>계좌이체</option>
                  <option>휴대폰결제</option>
                  <option>네이버페이</option>
                </select>
                <ul className={`pay-method-selector ${payMethodListOpen ? "on" : ""}`}>
                  {payMethod.map(option => (
                    <li key={option}
                    value={option}
                    className={`pay-method-option ${selectedPayMethod === option ? "selected" : ""}`}
                    onClick={() => payMethodSelection(option)}
                    >{option}</li>
                  ))}
                </ul>

              </div>
            </div>
            <div className="mypage-setting-cs">
              <span className="mypage-section-title">고객지원</span>
              <button>이용약관</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyPage;
