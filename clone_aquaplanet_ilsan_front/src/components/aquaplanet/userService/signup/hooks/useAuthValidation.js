import { useCallback, useEffect, useMemo } from "react";
import { errMsg } from "../data/err_msg";
import axiosInstance from "../../../../_axiosIntercepting/axiosIntercepting";

const useAuthValidation = ({
  memberEmail,
  memberPw,
  memberSubEmail,
  setIdCheck,
  setPwCheck,
  setSubEmailCheck,
  setEmailDupleCheck,
}) => {
  const emailPattern = useMemo(
    () =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co|kr|edu|gov|io|me)$/,
    []
  );
  const passwordPattern = useMemo(
    () =>
      /^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}|(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{10,13})$/,
    []
  );
  const namePattern = useMemo(() => /^[가-힣]{2,5}$/, []);
  const phonePattern = useMemo(() => /^010([0-9]{4})([0-9]{4})$/, []);

  useEffect(() => {
    setIdCheck(memberEmail !== "" && emailPattern.test(memberEmail));
    setPwCheck(memberPw !== "" && passwordPattern.test(memberPw));

    if (memberSubEmail !== "" && !emailPattern.test(memberSubEmail)) {
      setSubEmailCheck(false);
    } else {
      setSubEmailCheck(true);
    }
  }, [
    memberEmail,
    memberSubEmail,
    emailPattern,
    memberPw,
    passwordPattern,
    setIdCheck,
    setPwCheck,
    setSubEmailCheck,
  ]);

  const duplicateCheck = useCallback(async () => {
    if (memberEmail === "" || !emailPattern.test(memberEmail)) {
      alert(errMsg.EMAIL_FORMAT);
      return;
    }

    const response = await axiosInstance.get("/aquaplanet/duplicate", {
      params: {
        memberEmail: memberEmail,
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
  }, [emailPattern, memberEmail, setEmailDupleCheck]);

  return {
    emailPattern,
    passwordPattern,
    namePattern,
    phonePattern,
    duplicateCheck,
  };
};
export default useAuthValidation;
