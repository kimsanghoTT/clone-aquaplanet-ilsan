import React, { useContext, useEffect, useState } from "react";
import "../../../css/aquaplanet/mypage.css";
import LoginContext from "../../LoginContext";
import axios from "axios";
import TermsDetail from "./terms_detail";

const MyPage = () => {
  const { loginMember } = useContext(LoginContext);
  const [selectedPayMethod, setSelectedPayMethod] = useState("신용카드");
  const [payMethodListOpen, setPayMethodListOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [selectedTermsVersion, setSelectedTermsVersion] =
    useState("이용약관 v 1.0");
  const [termsVersionListOpen, setTermsVersionListOpen] = useState(false);
  const [selectedPreferredBranch, setSelectedPreferredBranch] = useState({
    63: false,
    여수: false,
    제주: false,
    일산: false,
    광교: false,
  });
  const payMethod = ["신용카드", "계좌이체", "휴대폰결제", "네이버페이"];

  useEffect(() => {
    if (loginMember && loginMember.memberEmail) {
      const fetchPreferredBranch = async () => {
        try {
          const response = await axios.get(
            `/aquaplanet/mypage/getPreferredBranch/${loginMember.memberEmail}`
          );
          setSelectedPreferredBranch(response.data);
          console.log("초기 선호 지점 불러오기 성공:", response.data);
        } catch (error) {
          console.error("초기 선호 지점 불러오기 실패:", error);
        }
      };
      fetchPreferredBranch();
    }
  }, [loginMember]); 

  useEffect(() => {
    if (loginMember && loginMember.memberEmail) {
      const updatePreferredBranch = async () => {
        try {
          const preferredBranchesArray = Object.keys(selectedPreferredBranch).filter(
            (branch) => selectedPreferredBranch[branch]
          );
          const preferredBranchesString = preferredBranchesArray.join(",");

          const dataToSend = {
            memberEmail: loginMember.memberEmail, 
            preferredBranch: preferredBranchesString, 
          };

          const response = await axios.post(
            "/aquaplanet/mypage/updatePreferredBranch",
            dataToSend
          );

          if (response.data && response.data.result === "SUCCESS") {
            console.log("선호 지점 업데이트 성공:", response.data.message || "업데이트 성공");
          } else {
            console.warn("선호 지점 업데이트 실패:", response.data ? response.data.message : "알 수 없는 오류");
          }
        } catch (error) {
          console.error("선호 지점 업데이트 중 오류 발생:", error);
          if (error.response) {
            console.error("응답 데이터:", error.response.data);
            console.error("응답 상태:", error.response.status);
          }
        }
      };
      updatePreferredBranch();
    }
  }, [selectedPreferredBranch, loginMember]);

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
  };

  const payMethodSelection = (option) => {
    setSelectedPayMethod(option);
    setPayMethodListOpen(false);
  };

  const handleModalOpen = () => {
    setTermsModalOpen(!termsModalOpen);
  };

  const handleTermsVersionList = () => {
    setTermsVersionListOpen(!termsVersionListOpen);
  };

  const termsVersionSelection = (version) => {
    setSelectedTermsVersion(version);
    setTermsVersionListOpen(false);
  };

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
                <span
                  className={`pay-method-display ${payMethodListOpen ? "on" : ""}`}
                  onClick={handlePayMethodList}
                >
                  {selectedPayMethod}
                </span>
                <select defaultValue="신용카드">
                  <option>신용카드</option>
                  <option>계좌이체</option>
                  <option>휴대폰결제</option>
                  <option>네이버페이</option>
                </select>
                <ul
                  className={`pay-method-selector ${payMethodListOpen ? "on" : ""}`}
                >
                  {payMethod.map((option) => (
                    <li
                      key={option}
                      value={option}
                      className={`pay-method-option ${selectedPayMethod === option ? "selected" : ""}`}
                      onClick={() => payMethodSelection(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mypage-setting-cs">
              <span className="mypage-section-title">고객지원</span>
              <button type="button" onClick={handleModalOpen}>
                <span>이용약관</span>
              </button>
              <div
                className={`terms-modal-wrapper ${termsModalOpen ? "open" : ""}`}
              >
                <div className="terms-modal-container">
                  <button className="modal-close-btn" type="button" onClick={handleModalOpen}></button>
                  <div className="modal-terms-content">
                    <h2>한화 아쿠아플라넷몰 서비스 이용약관</h2>
                    <span
                      className={`terms-version-display ${termsVersionListOpen ? "on" : ""}`}
                      onClick={handleTermsVersionList}
                    >
                      {selectedTermsVersion}
                    </span>
                    <select defaultValue="이용약관 v 1.0">
                      <option>이용약관 v 1.0</option>
                    </select>
                    <ul
                      className={`terms-version-selector ${termsVersionListOpen ? "on" : ""}`}
                    >
                      <li
                        value={"이용약관 v 1.0"}
                        className={`terms-version-item ${selectedTermsVersion === "이용약관 v 1.0" ? "selected" : ""}`}
                        onClick={() => termsVersionSelection("이용약관 v 1.0")}
                      >
                        이용약관 v 1.0
                      </li>
                    </ul>
                    <hr/>
                    <TermsDetail/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyPage;
