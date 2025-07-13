import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const useHeaderScrollEvent = (headerRef, isInMainPage) => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const scrollState = useRef(null);

  useLayoutEffect(() => {

    const scrollEvent = () => {
      const scrollPoint = window.pageYOffset || document.documentElement.scrollTop;

      if (isInMainPage) {
        if (scrollPoint === 0 && scrollState.current !== "top") {
          scrollState.current = "top"
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: 0, duration: 0.5 });
          }
        } else if(scrollPoint > 0 && scrollState.current !== "scrolled"){
          scrollState.current = "scrolled"
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: "-50px", duration: 0.5 });
          }
        }

        const scrollOnBottom = document.documentElement.scrollHeight - scrollPoint - window.innerHeight;

        if (headerRef.current) {
          headerRef.current.style.display = scrollOnBottom <= 0 ? "none" : "block";
        }
      } 
      else {
        if (scrollPoint <= 740 && scrollState.current !== "outOfContent") {
          scrollState.current = "outOfContent"
          setIsHeaderScrolled(false);
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: 0, duration: 0.5 });
          }

        } else if(scrollPoint > 740 && scrollState.current !== "inContent") {
          scrollState.current = "inContent"
          setIsHeaderScrolled(true);
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: "-50px", duration: 0.5 });
          }
        }
      }
    };

    scrollEvent();
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [headerRef, isInMainPage, scrollState]);

  return { isHeaderScrolled, scrollState };
};

export default useHeaderScrollEvent;