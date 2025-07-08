import gsap from "gsap";
import { useEffect, useState } from "react";

const useCopyEmail = ({member, setMember}) => {
  const [copyEmail, setCopyEmail] = useState(false);

  useEffect(() => {
    if (copyEmail) {
      gsap.to(".sameEmailBtn span", { color: "#222", duration: 0.2 });
      document.querySelector(".sameEmailBtn").classList.add("active");
    } else {
      gsap.to(".sameEmailBtn span", { color: "#b4b4b4", duration: 0.2 });
      document.querySelector(".sameEmailBtn").classList.remove("active");
    }
  }, [copyEmail]);

  const usingSameEmail = () => {
    setCopyEmail((prev) => {
      const useSame = !prev;

      setMember((userData) => ({
        ...userData,
        memberSubEmail: useSame ? member.memberEmail : "",
      }));

      return useSame;
    });
  };

  return { usingSameEmail };
};
export default useCopyEmail;