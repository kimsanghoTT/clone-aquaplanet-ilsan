import React from "react";
import "../../../../css/aquaplanet/aquaplanet_login.css";
import "../../../../css/aquaplanet/aquaplanet_login_modals.css";
import FindIdModal from "./sub_components/find_id/aquaplanet_find_id";
import FindPwModal from "./sub_components/find_pw/aquaplanet_find_pw";
import useFindModal from "./hooks/useFindModal";
import LoginForm from "./sub_components/login_form";

const Login = () => {
  const { openModal, handleModal, closeModal, switchToPwModal } = useFindModal();

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
            <LoginForm handleModal={handleModal}/>
          </div>
        </div>
      </section>
      {openModal.findIdModal && (
        <FindIdModal
          onClose={() => closeModal("findIdModal")}
          switchToPwModal={switchToPwModal}
        />
      )}
      {openModal.findPwModal && (
        <FindPwModal onClose={() => closeModal("findPwModal")} />
      )}
    </>
  );
};
export default Login;
