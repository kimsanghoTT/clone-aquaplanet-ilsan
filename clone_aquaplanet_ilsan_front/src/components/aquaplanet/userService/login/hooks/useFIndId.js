import { useState } from "react";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const useFindId = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
    memberEmail:""
  });
  const msg = {
    NOT_FOUND: "일치하는 회원 정보를 찾을 수 없습니다.",
    UNKNOWN_ERR: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
  };
  
  const insertData = (e) => {
    const { name, value } = e.target;

    setMember((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const searchId = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/aquaplanet/login/find/id", {
        memberName: member.memberName,
        memberPhone: member.memberPhone,
      });
      if (response.data.result === "FOUND") {
        setUserId(response.data.memberEmail);
        setStep(2);
      } else if (response.data.result === "NOT_FOUND") {
        alert(msg.NOT_FOUND);
        return;
      } else {
        alert(msg.UNKNOWN_ERR);
        return;
      }
    } catch {
      alert(msg.UNKNOWN_ERR);
      return;
    }
  };

    return {
        step,
        userId,
        member,
        insertData,
        searchId,
        setStep, 
    };
}
export default useFindId;