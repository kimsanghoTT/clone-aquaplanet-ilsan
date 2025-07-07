import gsap from "gsap";
import { useEffect } from "react";

const useTooltipVisibility = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(".aside-tooltip", {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.2,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closeTooltipBox = () => {
    gsap.to(".aside-tooltip", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.2,
    });
  };

  return {closeTooltipBox};
};
export default useTooltipVisibility;
