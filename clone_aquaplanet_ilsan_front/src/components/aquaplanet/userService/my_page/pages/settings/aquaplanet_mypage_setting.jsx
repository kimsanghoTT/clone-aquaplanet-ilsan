import React, { useContext, useState } from "react";
import "../../../../../../css/aquaplanet/aquaplanet_mypage.css";
import LoginContext from "../../../../../LoginContext";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../common_sub_components/customDropdown.jsx";
import BranchCheckbox from "./sub_components/branch_checkbox.jsx";
import usePreferredBranch from "../../hooks/usePreferredBranch";
import TermsModal from "./sub_components/terms_modal.jsx";

const MyPageSetting = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [selectedPayMethod, setSelectedPayMethod] = useState("신용카드");
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const {selectedPreferredBranch, preferredBranchSelection} = usePreferredBranch(loginMember?.memberEmail);
  const payMethod = ["신용카드", "계좌이체", "휴대폰결제", "네이버페이"];
  const branches = ["63", "여수", "제주", "일산", "광교"];
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setTermsModalOpen(!termsModalOpen);
  };

  const logout = () => {
    navigate("/aquaplanet/mall");
    setLoginMember(null);
    localStorage.removeItem("loginMember");
  }

  if (!loginMember || !loginMember.memberEmail) {
    alert("잘못된 접근입니다.");
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
            <button className="logout-btn" onClick={logout}>로그아웃</button>
            <div className="mypage-setting-account">
              <span className="mypage-section-title">계정관리</span>
              <ul>
                <li>
                  <a href="/aquaplanet/member/mypage/certification">내 정보 관리</a>
                </li>
                <li>
                  <a href="/aquaplanet/member/mypage/setting">SNS로그인 연동 설정</a>
                </li>
              </ul>
            </div>
            <div className="mypage-setting-branch">
              <span className="mypage-section-title">선호지역 설정</span>
              <form className="branch-form">
                <BranchCheckbox
                  options={branches}
                  selectedValues={selectedPreferredBranch}
                  onChange={preferredBranchSelection}
                />
              </form>
              <span className="mypage-section-title">계정관리</span>
              <div className="mypage-pay-method">
                <span>즐겨찾는 결제수단</span>
                <CustomDropdown
                  options={payMethod}
                  selectedValue={selectedPayMethod}
                  displayClassName="pay-method-display"
                  selectorClassName="pay-method-selector"
                  optionClassName="pay-method-option"
                  onSelect={setSelectedPayMethod}
                />
              </div>
            </div>
            <div className="mypage-setting-cs">
              <span className="mypage-section-title">고객지원</span>
              <button type="button" onClick={handleModalOpen}>
                <span>이용약관</span>
              </button>
              <TermsModal
                isOpen={termsModalOpen}
                onClose={handleModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyPageSetting;
