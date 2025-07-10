import React, { useContext, useState } from "react";
import "../../../../css/aquaplanet/aquaplanet_header.css";
import LoginContext from "../../../LoginContext";
import { useNavigate } from "react-router-dom";
import { branches, navigationList } from "../data/constants";
import usePreferredBranchFilter from "./hooks/usePreferredBranchFilter";
import HeaderBranchSelector from "./sub_components/header_branch_selector.jsx";
import HeaderToggleBox from "./sub_components/header_toggle_box.jsx";

const AquaplanetHeader = ({ setSelectedPreferredBranch }) => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [toggleBoxOpen, setToggleBoxOpen] = useState(false);
  const navigate = useNavigate();

  const{
    branchSelectorOpen,
    branchSelectionState,
    openBranchSelector,
    handleFilter,
    applyFilter,
    selectorRef,
  } = usePreferredBranchFilter({loginMember, setSelectedPreferredBranch});



  const handleToggleBox = () => {
    setToggleBoxOpen(!toggleBoxOpen);
  };

  const navigateMyPage = () => {
    navigate("/aquaplanet/member/mypage/setting");
    setToggleBoxOpen(false);
  };
  
  const logout = () => {
    setLoginMember(null);
    localStorage.removeItem("loginMember");
    navigate("/aquaplanet/mall")
  }

  return (
    <>
      <div
        className={`aquaplanet-header-overlay-film ${toggleBoxOpen ? "active" : ""}`}
      ></div>
      <header className="aquaplanet-header">
        <h1>
          <a href="/aquaplanet/mall">
            <span className="aquaplanet-logo"></span>
          </a>
        </h1>
        <div className="aquaplanet-header-function">
          {!loginMember && (
            <div className="function-join">
              <a href="/aquaplanet/member/login">
                <span>로그인</span>
              </a>
              <a href="/aquaplanet/member/signup">
                <span>회원가입</span>
              </a>
            </div>
          )}

          <div className="function-util">
            <HeaderBranchSelector
              applyFilter={applyFilter}
              branchSelectionState={branchSelectionState}
              branchSelectorOpen={branchSelectorOpen}
              branches={branches}
              handleFilter={handleFilter}
              openBranchSelector={openBranchSelector}
              selectorRef={selectorRef}
            />
            <a
              className="navigate-home"
              href="/aquaplanet/mall"
            >
              <span>아쿠아플라넷 홈페이지</span>
            </a>
            {loginMember && (
              <button
                className="aquaplanet-header-setting-btn"
                onClick={navigateMyPage}
              ></button>
            )}
            <button
              className="aquaplanet-header-menu-btn"
              onClick={handleToggleBox}
            ></button>
          </div>
        </div>
      </header>
      <HeaderToggleBox
        loginMember={loginMember}
        logout={logout}
        navigationList={navigationList}
        toggleBoxOpen={toggleBoxOpen}
      />
    </>
  );
};
export default AquaplanetHeader;
