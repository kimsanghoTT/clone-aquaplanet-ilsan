import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const useHeaderScrollEvent = (headerRef, isInMainPage) => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const scrollState = useRef(null);


  useLayoutEffect(() => {
    const checkInitialScroll = () => {
      const initialScrollPoint = window.pageYOffset || document.documentElement.scrollTop;

      if (isInMainPage) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -130 },
          { opacity: 1, y: 0, duration: 1, ease: "power1.out" }
        );
        scrollState.current = initialScrollPoint === 0 ? "top" : "scrolled";
        setIsHeaderScrolled(false);
      } else {
        if (initialScrollPoint <= 790) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -130 },
            { opacity: 1, y: 0, duration: 1, ease: "power1.out" }
          );
          scrollState.current = "outOfContent";
          setIsHeaderScrolled(false);
        } else {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -130 },
            { opacity: 1, y: -50, duration: 0.5, ease: "power1.out" }
          );
          scrollState.current = "inContent";
          setIsHeaderScrolled(true);
        }
      }
    };

    const timeoutId = setTimeout(checkInitialScroll, 200);

    const scrollEvent = () => {
      const currentScrollPoint = window.pageYOffset || document.documentElement.scrollTop;

      if (isInMainPage) {
        if (currentScrollPoint === 0 && scrollState.current !== "top") {
          scrollState.current = "top";
          gsap.to(headerRef.current, { y: 0, duration: 0.5 });

        } 
        else if(currentScrollPoint > 0 && scrollState.current !== "scrolled"){
          scrollState.current = "scrolled";
          gsap.to(headerRef.current, { y: "-50px", duration: 0.5 });
        }

        const scrollOnBottom = document.documentElement.scrollHeight - currentScrollPoint - window.innerHeight;

        if (headerRef.current) {
          headerRef.current.style.display = scrollOnBottom <= 0 ? "none" : "block";
        }
      } 
      else {
        if (currentScrollPoint <= 790 && scrollState.current !== "outOfContent") {
          scrollState.current = "outOfContent"
          setIsHeaderScrolled(false);
          gsap.to(headerRef.current, { y: 0, duration: 0.5 });


        } else if(currentScrollPoint > 790 && scrollState.current !== "inContent") {
          scrollState.current = "inContent"
          setIsHeaderScrolled(true);
          gsap.to(headerRef.current, { y: "-50px", duration: 0.5 });

        }
      }
    };

    scrollEvent();
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
      clearTimeout(timeoutId);
    };
  }, [headerRef, isInMainPage, scrollState]);

  return { isHeaderScrolled, scrollState };
};

export default useHeaderScrollEvent;