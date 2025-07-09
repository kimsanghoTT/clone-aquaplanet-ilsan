import { useEffect, useState } from "react";
import {
  emailPattern,
  passwordPattern,
  phonePattern,
  namePattern,
} from "../../common_data/validation_pattern";
import { errMsg } from "../data/err_msg";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const useValidation = (member) => {
  const [emailDupleCheck, setEmailDupleCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(true);
  const [pwCheck, setPwCheck] = useState(true);
  const [subEmailCheck, setSubEmailCheck] = useState(true);
  const [pwDoubleCheck, setPwDoubleCheck] = useState("");

  useEffect(() => {
    setIdCheck(
      member.memberEmail !== "" && emailPattern.test(member.memberEmail)
    );
    setPwCheck(member.memberPw !== "" && passwordPattern.test(member.memberPw));

    if (
      member.memberSubEmail !== "" && !emailPattern.test(member.memberSubEmail)
    ) {
      setSubEmailCheck(false);
    } else {
      setSubEmailCheck(true);
    }
  }, [member.memberEmail, member.memberSubEmail, member.memberPw]);

  useEffect(() => {
    setEmailDupleCheck(false);
  }, [member.memberEmail]);

  const handlePwDoubleCheck = (e) => {
    setPwDoubleCheck(e.target.value);
  };

  const emailDuplicateCheck = async () => {
    if (member.memberEmail === "" || !emailPattern.test(member.memberEmail)) {
      alert(errMsg.EMAIL_FORMAT);
      return;
    }

    const response = await axiosInstance.get("/aquaplanet/duplicate", {
      params: {
        memberEmail: member.memberEmail,
      },
    });

    if (response.data === 0) {
      setEmailDupleCheck(true);
      alert("사용 가능한 이메일입니다.");
    } else {
      setEmailDupleCheck(false);
      alert(errMsg.EMAIL_EXISTS);
      return;
    }
  };

  const validateBeforeSubmit = () => {
    if (!idCheck) {
      alert(
        member.memberEmail === "" ? errMsg.EMAIL_REQUIRED : errMsg.EMAIL_FORMAT
      );
      return false;
    }

    if (!pwCheck) {
      alert(member.memberPw === "" ? errMsg.PW_REQUIRED : errMsg.PW_FORMAT);
      return false;
    }

    if (!subEmailCheck) {
      alert(errMsg.EMAIL_FORMAT);
      return false;
    }

    if (!emailDupleCheck) {
      alert(errMsg.EMAIL_DUPLE_CHECK_REQUIRED);
      return false;
    }

    if (member.memberPw !== pwDoubleCheck) {
      alert(errMsg.PW_CONFIRM);
      return false;
    }

    if (!namePattern.test(member.memberName)) {
      alert(errMsg.NAME_FORMAT);
      return false;
    }

    if (!phonePattern.test(member.memberPhone)) {
      alert(errMsg.PHONE_FORMAT);
      return false;
    }

    if(member.memberRegionCity && !member.memberRegionDistrict){
      alert(errMsg.DISTRICT_SELECTION);
      return false;
    }

    return true;
  }

  return {
    idCheck,
    pwCheck,
    subEmailCheck,
    pwDoubleCheck,
    handlePwDoubleCheck,
    emailDuplicateCheck,
    validateBeforeSubmit
  }
};
export default useValidation;
