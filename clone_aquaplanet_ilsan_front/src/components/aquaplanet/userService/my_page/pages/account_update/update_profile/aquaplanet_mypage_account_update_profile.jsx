import React, { useCallback, useContext, useEffect, useState } from "react";
import LoginContext from "../../../../../../LoginContext";
import { useNavigate } from "react-router-dom";
import { msg } from "../data/msg";
import axiosInstance from "../../../../../../_axiosIntercepting/axiosIntercepting";
import useProfileValidation from "../../../hooks/useProfileValidation";
import ProfileForm from "./sub_components/profile_form";
import ProfileRegionSelector from "./sub_components/profile_region_selector";
import UpdateSuccessModal from "./sub_components/profile_update_success_modal";
import "../../../../../../../css/aquaplanet/aquaplanet_mypage_account.css";

const UpdateProfile = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const { validateProfile } = useProfileValidation();
  const navigate = useNavigate();

  const [modifyStep, setModifyStep] = useState(null);

  const [modifyProfile, setModifyProfile] = useState({
    memberNo: loginMember?.memberNo,
    memberName: loginMember?.memberName || "",
    memberPhone: loginMember?.memberPhone || "",
    memberBirth: loginMember?.memberBirth || "",
    memberSubEmail: loginMember?.memberSubEmail || "",
    memberRegionCity: loginMember?.memberRegionCity || "",
    memberRegionDistrict: loginMember?.memberRegionDistrict || "",
  });

  useEffect(() => {
    if (loginMember) {
      setModifyProfile({
        memberNo: loginMember.memberNo,
        memberName: loginMember.memberName || "",
        memberPhone: loginMember.memberPhone || "",
        memberBirth: loginMember.memberBirth || "",
        memberSubEmail: loginMember.memberSubEmail || "",
        memberRegionCity: loginMember.memberRegionCity || "",
        memberRegionDistrict: loginMember.memberRegionDistrict || "",
      });
    }
  }, [loginMember]);

  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;

    setModifyProfile((before) => ({
      ...before,
      [name]: value,
    }));
  }, []);

  const handleRegionChange = useCallback((city, district) => {
    setModifyProfile((profile) => ({
      ...profile,
      memberRegionCity: city,
      memberRegionDistrict: district,
    }));
  }, []);

  const completeModifyProfile = (e) => {
    setModifyStep(null);
    navigate("/aquaplanet/member/mypage/userInfo");
  };

  const submitModifyProfile = async (e) => {
      e.preventDefault();
      const isValidForm = validateProfile(modifyProfile);

      if (!isValidForm) {
        return;
      }

      try {
        const response = await axiosInstance.post(
          "/aquaplanet/mypage/modifyProfile",
          modifyProfile
        );
        if (response.status === 200) {
          setModifyStep("complete");
          setLoginMember({
            ...loginMember,
            memberName: modifyProfile.memberName,
            memberPhone: modifyProfile.memberPhone,
            memberBirth: modifyProfile.memberBirth,
            memberSubEmail: modifyProfile.memberSubEmail,
            memberRegionCity: modifyProfile.memberRegionCity,
            memberRegionDistrict: modifyProfile.memberRegionDistrict,
          });
        }
      } catch {
        alert(msg.GENERIC_ERROR);
      }
  }
  useEffect(() => {
          console.log(modifyStep);

  },[modifyStep])

  const onCancel = () => {
    navigate("/aquaplanet/member/mypage/userInfo");
  };

  if(!loginMember){
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
            <p>내 정보 수정</p>
            <p style={{ margin: 0 }}></p>
          </div>
          <div className="member-mypage-content member-update-profile">
            <form onSubmit={submitModifyProfile}>
              <div className="profile-form-wrapper">
                <ProfileForm
                  modifyProfile={modifyProfile}
                  handleProfileChange={handleProfileChange}
                />
                <ProfileRegionSelector
                  initialCity={modifyProfile.memberRegionCity}
                  initialDistrict={modifyProfile.memberRegionDistrict}
                  onRegionChange={handleRegionChange}
                />
              </div>
              <div className="mypage-modify-btn-area">
                <button>변경내용 저장</button>
                <button type="button" onClick={onCancel}>
                  취소
                </button>
              </div>
            </form>
            {modifyStep === "complete" && (
              <UpdateSuccessModal
                completeModifyProfile={completeModifyProfile}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default UpdateProfile;
