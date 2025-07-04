import { useEffect } from "react";
import gsap from "gsap";

const useHeaderScrollEvent = (headerRef, upperNavRef) => {
  useEffect(() => {
    const scrollEvent = () => {
      const scrollOnTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollOnTop === 0) {
        if (upperNavRef.current) {
          gsap.to(upperNavRef.current, { opacity: 1, duration: 0.5, height: "50px" });
        }
        if (headerRef.current) {
          gsap.to(headerRef.current, { y: 0, duration: 0.5 });
        }
      } else { // else if (scrollOnTop !== 0) 대신 else로 간소화 가능
        if (upperNavRef.current) {
          gsap.to(upperNavRef.current, { opacity: 0, duration: 0.5, height: 0 });
        }
        if (headerRef.current) {
          gsap.to(headerRef.current, { y: "-20px", duration: 0.5 });
        }
      }
    };

    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [headerRef, upperNavRef]); // Ref가 변경될 일은 없지만, 의존성 배열에 명시
};

export default useHeaderScrollEvent;