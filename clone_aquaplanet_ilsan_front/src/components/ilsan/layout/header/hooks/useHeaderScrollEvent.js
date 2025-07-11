import { useEffect } from "react";
import gsap from "gsap";

const useHeaderScrollEvent = (headerRef, upperNavRef, isInMainPage, lowerNavRef) => {

  useEffect(() => {
    const scrollEvent = () => {
      const scrollPoint = window.pageYOffset || document.documentElement.scrollTop;

      if(isInMainPage){
        if (scrollPoint === 0) {
          if (upperNavRef.current) {
            gsap.to(upperNavRef.current, { opacity: 1, duration: 0.5, height: "50px" });
          }
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: 0, duration: 0.5 });
          }
        } else { 
          if (upperNavRef.current) {
            gsap.to(upperNavRef.current, { opacity: 0, duration: 0.5, height: 0 });
          }
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: "-20px", duration: 0.5 });
          }
        }

        const scrollOnBottom = document.documentElement.scrollHeight - scrollPoint - window.innerHeight;
        if (headerRef.current) {
           headerRef.current.style.display = scrollOnBottom <= 0 ? "none" : "block";
        }
      }
      else{
        if (scrollPoint <= 740) {
          if (upperNavRef.current) {
            gsap.to(upperNavRef.current, { opacity: 1, duration: 0.2, height: "50px" });
          }
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: 0, duration: 0.2});
          }
          if(lowerNavRef.current){
            gsap.to(lowerNavRef.current, {background:"transparent", duration:0.2});
          }
        } else { 
          if (upperNavRef.current) {
            gsap.to(upperNavRef.current, { opacity: 0, duration: 0.2, height: 0 });
          }
          if (headerRef.current) {
            gsap.to(headerRef.current, { y: "-20px", duration: 0.2});
          }
          if(lowerNavRef.current){
            gsap.to(lowerNavRef.current, {background:"#fff", duration:0.2});
          }
        }
      }


    };

    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [headerRef, upperNavRef, isInMainPage, lowerNavRef]); 
};

export default useHeaderScrollEvent;