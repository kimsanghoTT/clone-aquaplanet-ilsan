import { useLayoutEffect, useState } from "react";
import gsap from "gsap";

const useHeaderScrollEvent = (headerRef, isInMainPage) => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useLayoutEffect(() => {

    const scrollEvent = () => {
      const scrollPoint = window.pageYOffset || document.documentElement.scrollTop;

      if (isInMainPage) {
        if (scrollPoint === 0) {
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: 0, duration: 0.5 });
          }
        } else {
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: "-50px", duration: 0.5 });
          }
        }
        const scrollOnBottom = document.documentElement.scrollHeight - scrollPoint - window.innerHeight;
        if (headerRef.current) {
          headerRef.current.style.display = scrollOnBottom <= 0 ? "none" : "block";
        }
      } else {
        if (scrollPoint <= 740) {
          setIsHeaderScrolled(false);
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: 0, duration: 0.5 });
          }

        } else {
          setIsHeaderScrolled(true);
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: "-50px", duration: 0.5 });
          }
        }
      }
    };

    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [headerRef, isInMainPage]);

  return { isHeaderScrolled };
};

export default useHeaderScrollEvent;
