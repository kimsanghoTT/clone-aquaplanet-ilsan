import React from "react";
import ProfileInput from "./profile_input";

const ProfileForm = ({modifyProfile, handleProfileChange}) => {

    return (
        <>
            <ProfileInput
                label={"이름"}
                name={"memberName"}
                value={modifyProfile.memberName}
                onChange={handleProfileChange}
                required={true}
                placeholder={"이름을 입력해주세요."}
            />
            <ProfileInput
                label={"연락처"}
                name={"memberPhone"}
                value={modifyProfile.memberPhone}
                onChange={handleProfileChange}
                required={true}
                placeholder={"'-'빼고 입력"}
            />
            <ProfileInput
                label={"생년월일"}
                name={"memberBirth"}
                value={modifyProfile.memberBirth}
                onChange={handleProfileChange}
                required={false}
                placeholder={"yyyy.mm.dd"}
            />
            <ProfileInput
                label={"이메일"}
                name={"memberSubEmail"}
                value={modifyProfile.memberSubEmail}
                onChange={handleProfileChange}
                required={false}
                placeholder={""}
            />
        </>
    )
}
export default ProfileForm;