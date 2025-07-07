import { useMemo, useState } from "react";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const msg = {
  SEND_AUTHCODE: "이메일로 인증번호가 발송되었습니다.",
  NOT_FOUND: "입력하신 이메일과 일치하는 회원 정보를 찾을 수 없습니다.",
  UNKNOWN_ERR: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
  INVALID_CODE: "인증번호가 일치하지 않습니다.",
  AUTH_SUCCESS: "인증 성공",
  PW_CHANGE: "비밀번호가 변경되었습니다.",
  PW_FORMAT:
    "비밀번호는 영문 숫자 포함 10~13자, 특수문자 포함 시 8~13자로 입력해 주세요",
  PW_CONFIRM: "비밀번호가 일치하지 않습니다",
  USED_PW: "이전과 다른 비밀번호를 작성해주세요",
};

const useFindPw = () => {
  const [step, setStep] = useState(1);
  const [authCode, setAuthCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwDoubleCheck, setNewPwDoubleCheck] = useState("");
  const [pwVision, setPwVision] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");

  const passwordPattern = useMemo(
    () =>
      /^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}|(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{10,13})$/,
    []
  );

  const inputEmail = (e) => {
    setMemberEmail(e.target.value);
  };

  const inputAuthCode = (e) => {
    setAuthCode(e.target.value);
  };

  const inputNewPw = (e) => {
    setNewPw(e.target.value);
  };

  const inputNewPwDoubleCheck = (e) => {
    setNewPwDoubleCheck(e.target.value);
  };

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const requestAuthCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/aquaplanet/login/find/requestCode",
        {
          memberEmail: memberEmail,
        }
      );

      if (response.data.result === "SUCCESS") {
        alert(msg.SEND_AUTHCODE);
        setStep(2);
      } else if (response.data.result === "NOT_FOUND") {
        alert(msg.NOT_FOUND);
      } else {
        alert(msg.UNKNOWN_ERR);
      }
    } catch (error){
      console.log(error);
      alert(msg.UNKNOWN_ERR);
    }
  };

  const verifyingAuthCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/aquaplanet/login/find/verifyCode",
        {
          memberEmail: memberEmail,
          authCode: authCode,
        }
      );

      if (response.data.result === "SUCCESS") {
        alert(msg.AUTH_SUCCESS);
        setStep(3);
      } else if (response.data.result === "INVALID") {
        alert(msg.INVALID_CODE);
      } else {
        alert(msg.UNKNOWN_ERR);
      }
    } catch {
      alert(msg.UNKNOWN_ERR);
    }
  };

  const updatePw = async (e) => {
    e.preventDefault();

    if (!passwordPattern.test(newPw)) {
      alert(msg.PW_FORMAT);
      return;
    }
    if (newPw !== newPwDoubleCheck) {
      alert(msg.PW_CONFIRM);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/aquaplanet/login/find/updatePw",
        {
          memberEmail: memberEmail,
          memberPw: newPw,
        }
      );
      if (response.data.result === "SUCCESS") {
        alert(msg.PW_CHANGE);
        setStep(4);
      } else if (response.data.result === "USED_PW") {
        alert(msg.USED_PW);
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
    memberEmail,
    authCode,
    newPw,
    newPwDoubleCheck,
    pwVision,
    inputEmail,
    inputAuthCode,
    inputNewPw,
    inputNewPwDoubleCheck,
    pwVisionOn,
    requestAuthCode,
    verifyingAuthCode,
    updatePw,
  };
};
export default useFindPw;
