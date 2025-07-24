import moment from "moment";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../../../../../LoginContext";
import axiosInstance from "../../../../../../_axiosIntercepting/axiosIntercepting";
import { msg } from "../data/msg";
import ExitSuccessModal from "./sub_components/exit_user_success_modal.jsx";
moment.locale("ko");

const DeleteAccount = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [exitCheckPw, setExitCheckPw] = useState("");
  const [checkExitTerms, setCheckExitTerms] = useState(false);
  const [noticeExitModal, setNoticeExitModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckExitTerms = () => {
    setCheckExitTerms(!checkExitTerms);
  };

  const submitExitMember = async (e) => {
    e.preventDefault();

    if (!checkExitTerms) {
      alert(msg.EXIT_TERMS);
      return;
    }

    try {
      const validationResponse = await axiosInstance.post(
        "/aquaplanet/mypage/checkPassword",
        {
          memberNo: loginMember.memberNo,
          inputPw: exitCheckPw,
        }
      );

      if (validationResponse.data.result === "invalidated") {
        alert(msg.PW_CONFIRM);
        return;
      }

      const finalConfirm = window.confirm(msg.FINAL_CONFIRM);
      if (!finalConfirm) {
        return;
      }

      const deleteResponse = await axiosInstance.delete(
        `/aquaplanet/mypage/deleteAccount/${loginMember.memberNo}`
      );
      if (deleteResponse.status === 200) {
        setNoticeExitModal(!noticeExitModal);
      } else {
        alert(msg.GENERIC_ERROR);
      }
    } catch (error) {
      alert(msg.GENERIC_ERROR);
      return;
    }
  };

  const finishExitAccount = () => {
    localStorage.removeItem("loginMember");
    setLoginMember(null);
    setNoticeExitModal(!noticeExitModal);
    navigate("/aquaplanet/mall");
  };

  const onCancel = () => {
    navigate("aquaplanet/member/mypage/userInfo");
  };

  return (
    <section className="member-mypage">
      <div className="member-visual-format">
        <figure className="member-visual-image"></figure>
      </div>
      <div className="aquaplanet-member-content">
        <div className="member-mypage-box">
          <div className="member-mypage-title">
            <p>회원탈퇴</p>
            <p className="mypage-exit-title">
              정말 아쿠아플라넷 회원에서 탈퇴하시겠어요?
            </p>
            <p className="mypage-exit-message">
              탈퇴하시면 온라인에서 구매하신 티켓을 확인하실 수 없습니다. 그래도
              탈퇴하시겠습니까?
            </p>
          </div>
          <div className="member-mypage-content member-exit">
            <form onSubmit={submitExitMember}>
              <div className="exit-form-wrapper">
                <div
                  className={`member-exit-check ${checkExitTerms ? "active" : ""}`}
                  onClick={handleCheckExitTerms}
                >
                  <span>
                    내용을 이해했으며, 탈퇴 후 온라인에서 티켓 및 쿠폰, 쿠폰
                    교환권, 스탬프 등 서비스를 통해 획득한 내용들을 확인할 수
                    없음에 동의합니다.
                  </span>
                  <br />
                  <span>
                    ※ 카카오 계정으로 가입한 경우 ‘카카오 설정 → 카카오 계정 →
                    연결된 서비스 관리’에서 삭제할 수 있습니다.
                  </span>
                </div>
                <div className="member-exit-check-pw">
                  <label htmlFor="memberPw">비밀번호</label>
                  <input
                    type="password"
                    value={exitCheckPw}
                    onChange={(e) => setExitCheckPw(e.target.value)}
                    placeholder="비밀번호를 입력해 주세요"
                  />
                </div>
              </div>
              <div className="mypage-modify-btn-area">
                <button>회원 탈퇴</button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </div>
            </form>
            {noticeExitModal && (
              <ExitSuccessModal finishExitAccount={finishExitAccount} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default DeleteAccount;
