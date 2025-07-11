import { useCallback, useEffect, useRef } from "react";
import { animateScroll as scroll } from "react-scroll";

const useMainPageScroll = (mainPageRef, eventListOpen) => {
  const scrolling = useRef(false);

  const wheelingScrollMethod = useCallback((e) => {
    if(eventListOpen){
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (scrolling.current) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    scrolling.current = true;

    const scrollOnTop = window.pageYOffset;
    const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;
    const direction = e.deltaY > 0 ? 1 : -1;
    let range = window.innerHeight;

    if (scrollOnBottom <= 0) {
      range = 500;
    }

    scroll.scrollMore(direction * range, { duration: 700, smooth: true });

    setTimeout(() => {
      scrolling.current = false;
    }, 900);
  }, [eventListOpen]);

  const keyArrowScrollMethod = useCallback((e) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
      return;
    }

    if(eventListOpen){
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (scrolling.current) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    scrolling.current = true;

    const scrollOnTop = window.pageYOffset;
    const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;
    const direction = e.key === "ArrowUp" ? -1 : 1;
    let range = window.innerHeight;

    if (scrollOnBottom <= 0) {
      range = 500;
    }

    scroll.scrollMore(direction * range, { duration: 700, smooth: true });

    setTimeout(() => {
      scrolling.current = false;
    }, 900);
  }, [eventListOpen]);

  useEffect(() => {
    const mainElement = mainPageRef.current;

    if(mainElement){
      document.addEventListener("wheel", wheelingScrollMethod, { passive: false });
      document.addEventListener("keydown", keyArrowScrollMethod);
    }

    return () => {
      if(mainElement){
        document.removeEventListener("wheel", wheelingScrollMethod);
        document.removeEventListener("keydown", keyArrowScrollMethod);
      }

    };
  }, [wheelingScrollMethod, keyArrowScrollMethod, mainPageRef]);
};

export default useMainPageScroll;
