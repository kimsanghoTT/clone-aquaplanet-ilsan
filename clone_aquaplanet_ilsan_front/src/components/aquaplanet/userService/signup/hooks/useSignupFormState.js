import { useCallback, useEffect, useState } from "react";
import useFormInput from "./useFormInput";
import gsap from "gsap";

const useSignupFormState = () => {
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

  const [memberName, handleMemberNameChange, setMemberName] = useFormInput("");
  const [memberPhone, handleMemberPhoneChange, setMemberPhone] = useFormInput("");
  const [pwDoubleCheck, handlePwDoubleCheckChange, setPwDoubleCheck] = useFormInput("");

  const [emailDupleCheck, setEmailDupleCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(true);
  const [pwCheck, setPwCheck] = useState(true);
  const [subEmailCheck, setSubEmailCheck] = useState(true);
  const [copyEmail, setCopyEmail] = useState(false);
  const [pwVision, setPwVision] = useState(false);

  const [selectedPreferredBranch, setSelectedPreferredBranch] = useState({
    여수: false,
    제주: false,
    일산: false,
    광교: false,
  });

  const [step, setStep] = useState(1);

  const insertData = useCallback((e) => {
    const { name, value } = e.target;
    setMember((prevMember) => {
      const newMember = {
        ...prevMember,
        [name]: value,
      };

      if (name === "memberEmail") {
        setEmailDupleCheck(false);
      }
      return newMember;
    });
  }, []);

  const pwVisionOn = () => {
    setPwVision(!pwVision);
  };

  const usingSameEmail = () => {
    setCopyEmail((prev) => {
      const newState = !prev;
      setMember((userData) => ({
        ...userData,
        memberSubEmail: newState ? member.memberEmail : "",
      }));
      return newState;
    });
  };

  useEffect(() => {
    if (copyEmail) {
      gsap.to(".sameEmailBtn span", { color: "#222", duration: 0.2 });
      document.querySelector(".sameEmailBtn").classList.add("active");
    } else {
      gsap.to(".sameEmailBtn span", { color: "#b4b4b4", duration: 0.2 });
      document.querySelector(".sameEmailBtn").classList.remove("active");
    }
  }, [copyEmail]);

  return {
    member, setMember, 
    memberName, handleMemberNameChange, setMemberName, 
    memberPhone, handleMemberPhoneChange, setMemberPhone, 
    emailDupleCheck, setEmailDupleCheck,
    idCheck, setIdCheck,
    pwCheck, setPwCheck,
    subEmailCheck, setSubEmailCheck,
    pwDoubleCheck, handlePwDoubleCheckChange, setPwDoubleCheck,
    copyEmail, setCopyEmail,
    pwVision, setPwVision,
    selectedPreferredBranch, setSelectedPreferredBranch,
    step, setStep,
    insertData,
    pwVisionOn,
    usingSameEmail,
  }
};
export default useSignupFormState;
