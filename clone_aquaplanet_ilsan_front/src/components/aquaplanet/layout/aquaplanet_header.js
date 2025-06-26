import React, { useContext, useEffect, useRef, useState } from "react";
import "../../../css/aquaplanet/aquaplanet_header.css";
import LoginContext from "../../LoginContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosIntercepting";

const AquaplanetHeader = ({ selectedPreferredBranch, setSelectedPreferredBranch }) => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [branchSelectorOpen, setBranchSelectorOpen] = useState(false);
  const [toggleBoxOpen, setToggleBoxOpen] = useState(false);
  const [branchSelectionState, setBranchSelectionState] = useState(selectedPreferredBranch);
  const branch = ["여수", "제주", "일산", "광교"];

  const navigationList = {
    "티켓 구매하기": "/aquaplanet/mall",
    "나의 티켓 보기": "https://mall.aquaplanet.co.kr/mypage/ticket_list.do",
    "구매내역 보기": "https://mall.aquaplanet.co.kr/mypage/reservation_list.do",
    "나의 쿠폰함": "https://mall.aquaplanet.co.kr/mypage/coupon_list.do",
    추천코드: "https://mall.aquaplanet.co.kr/mypage/recommend_code.do",
    이벤트: "https://mall.aquaplanet.co.kr/event/list.do",
    스탬프: "https://mall.aquaplanet.co.kr/mypage/stamp/card.do",
    공지사항: "https://mall.aquaplanet.co.kr/customer/notice/list.do",
    "자주묻는 질문": "https://mall.aquaplanet.co.kr/customer/faq/list.do",
    "1:1 문의": "https://mall.aquaplanet.co.kr/mypage/qna/list.do",
  };

  const locationRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setBranchSelectorOpen(false);
        setBranchSelectionState(selectedPreferredBranch);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectedPreferredBranch]);

  useEffect(() => {
    const getPreferredBranches = async () => {
      try{
        const response = await axiosInstance.get(`/aquaplanet/mypage/getPreferredBranch/${loginMember.memberEmail}`);
        setSelectedPreferredBranch(response.data);
        setBranchSelectionState(response.data);
      }
      catch{
        console.log("선호지점 가져오기 오류");
      }
    }

    if(loginMember){
      getPreferredBranches();
    }
  },[loginMember, setSelectedPreferredBranch])

  const branchSelector = () => {
    setBranchSelectorOpen(true);
  };

  const handleFilter = (branch) => {
    setBranchSelectionState((before) => ({
      ...before,
      [branch]: !before[branch],
    }));
  };

  const applyFilter = () => {
    const whenAllUnselected = Object.values(branchSelectionState).every(f => !f);

    if(whenAllUnselected){
      //reduce = 객체, 문자열, 배열 등을 압축하는 것. 여기선 하나의 가상 객체 생성을 위해 사용
      const returnToAllSelected = branch.reduce((newVar, branch) => {
        newVar[branch] = true;
        return newVar;
      },{})

      setSelectedPreferredBranch(returnToAllSelected);
    }
    else{
      setSelectedPreferredBranch(branchSelectionState);
    }

    setBranchSelectorOpen(false);
  }

  const handleToggleBox = () => {
    setToggleBoxOpen(!toggleBoxOpen);
  };

  const navigateMyPage = () => {
    navigate("/aquaplanet/member/mypage/setting");
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
            <div className="aquaplanet-location-selector">
              <button type="button" onClick={branchSelector}>
                <span>지역</span>
              </button>
              <div
                ref={locationRef}
                className={`aquaplanet-location-list ${branchSelectorOpen ? "on" : ""}`}
              >
                <ul>
                  {branch.map((branch, index) => (
                    <li
                      key={index}
                      className={
                        branchSelectionState[branch]
                          ? "selected"
                          : ""
                      }
                      onClick={() => handleFilter(branch)}
                    >
                      {branch}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={applyFilter}>적용</button>
              </div>
            </div>
            <a
              className="navigate-home"
              href="https://www.aquaplanet.co.kr/63/index.do"
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
      <div
        className={`aquaplanet-header-toggle-box ${toggleBoxOpen ? "active" : ""}`}
      >
        <div className="aquaplanet-header-layout01">
          <menu className="aquaplanet-header-navigation">
            <ul className="aquaplanet-header-navigation-list">
              {Object.entries(navigationList).map(([text, url]) => (
                <li className="navi-item" key={text}>
                  <a href={url}>{text}</a>
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
                  안녕하세요! <span>김상호</span>님 아쿠아플라넷에 <br />
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
    </>
  );
};
export default AquaplanetHeader;
