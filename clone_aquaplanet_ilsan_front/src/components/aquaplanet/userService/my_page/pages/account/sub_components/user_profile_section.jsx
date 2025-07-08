import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const UserProfileSection = ({ loginMember, setLoginMember }) => {
  const navigate = useNavigate();
  const formattedPhone = useMemo(() => {
    return loginMember?.memberPhone
      ? `${loginMember.memberPhone.substring(0, 3)}-${loginMember.memberPhone.substring(3, 7)}-${loginMember.memberPhone.substring(7)}`
      : "";
  }, [loginMember?.memberPhone]);

  const logout = useCallback(() => {
    navigate("/");
    setLoginMember(null);
    localStorage.removeItem("loginMember");
  },[navigate, setLoginMember]);

  return (
    <>
      <button type="button" className="logout-btn" onClick={logout}>
        로그아웃
      </button>
      <ul className="user-profile-list">
        <li className="user-profile-item">
          <span className="profile-label">이름</span>
          <span className="profile-value">{loginMember.memberName}</span>
        </li>
        <li className="user-profile-item">
          <span className="profile-label">연락처</span>
          <span className="profile-value">{formattedPhone}</span>
        </li>
        <li className="user-profile-item">
          <span className="profile-label">생년월일</span>
          <span className="profile-value">
            {loginMember?.memberBirth || "-"}
          </span>
        </li>
        <li className="user-profile-item">
          <span className="profile-label">이메일</span>
          <span className="profile-value">
            {loginMember?.memberSubEmail || "-"}
          </span>
        </li>
        <li className="user-profile-item">
          <span className="profile-label">거주지역</span>
          <span className="profile-value">
            {loginMember?.memberRegionCity || "-"} &nbsp;
            {loginMember?.memberRegionDistrict || "-"}
          </span>
        </li>
      </ul>
    </>
  );
};
export default UserProfileSection;
