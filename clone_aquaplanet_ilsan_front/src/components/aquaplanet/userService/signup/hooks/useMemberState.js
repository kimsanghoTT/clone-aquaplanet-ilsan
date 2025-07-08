import { useState } from "react";

const useMemberState = () => {
  const [member, setMember] = useState({
    memberEmail: "",
    memberPw: "",
    memberSubEmail: "",
    memberRegionCity: "",
    memberRegionDistrict: "",
    memberName: "",
    memberPhone: "",
    preferredBranch: [],
  });

  const insertData = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { member, setMember, insertData };
};
export default useMemberState;
