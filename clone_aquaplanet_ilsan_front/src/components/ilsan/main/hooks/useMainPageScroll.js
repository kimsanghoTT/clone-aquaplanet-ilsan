import { useCallback, useEffect, useRef } from "react";
import { animateScroll as scroll } from "react-scroll";

const useMainPageScroll = (eventItemBoxRef, eventListOpen) => {
  const scrolling = useRef(false);
  const headerRef = useRef(null);

  useEffect(() => {
    headerRef.current = document.querySelector("header");
  }, []);

  const blockInnerScroll = useCallback((e) => {
    if (!eventListOpen) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (eventItemBoxRef.current) {
      eventItemBoxRef.current.scrollTop += e.deltaY;
    }
  }, [eventListOpen, eventItemBoxRef]);

  const wheelingScrollMethod = useCallback((e) => {
    if (eventListOpen && eventItemBoxRef.current?.contains(e.target)) {
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
    const dir = e.deltaY > 0 ? 1 : -1;
    let range = window.innerHeight;

    if (scrollOnBottom <= 0) {
      range = 500;
    }

    scroll.scrollMore(dir * range, { duration: 700, smooth: true });

    setTimeout(() => {
      scrolling.current = false;
    }, 900);
  }, [eventItemBoxRef, eventListOpen]);

  const keyArrowScrollMethod = useCallback((e) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
      return;
    }

    if (eventItemBoxRef.current?.contains(e.target)) {
      e.preventDefault();
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
    const dir = e.key === "ArrowUp" ? -1 : 1;
    let range = window.innerHeight;

    if (scrollOnBottom <= 0) {
      range = 500;
    }

    scroll.scrollMore(dir * range, { duration: 700, smooth: true });

    setTimeout(() => {
      scrolling.current = false;
    }, 900);
  }, [eventItemBoxRef]);

  const headerVisibility = useCallback(() => {
    if (!headerRef.current) return;

    const scrollOnTop = window.pageYOffset;
    const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;

    headerRef.current.style.display = scrollOnBottom <= 0 ? "none" : "block";
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", wheelingScrollMethod, { passive: false });
    window.addEventListener("keydown", keyArrowScrollMethod);
    window.addEventListener("scroll", headerVisibility);

    const box = eventItemBoxRef?.current;
    if (box) {
      box.addEventListener("wheel", blockInnerScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", wheelingScrollMethod);
      window.removeEventListener("keydown", keyArrowScrollMethod);
      window.removeEventListener("scroll", headerVisibility);

      if (box) {
        box.removeEventListener("wheel", blockInnerScroll);
      }
    };
  }, [wheelingScrollMethod, keyArrowScrollMethod, headerVisibility, blockInnerScroll, eventListOpen, eventItemBoxRef]);
};

export default useMainPageScroll;
