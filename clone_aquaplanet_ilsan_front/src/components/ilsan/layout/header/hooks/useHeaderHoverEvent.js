import { useState } from "react";
import gsap from "gsap";

const useHeaderHoverEvent = (headerRef, subMenuRefs, isHeaderScrolled, isInMainPage) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if(!headerRef || !subMenuRefs){
      return;
    }
      setIsHovered(true);
      Object.values(subMenuRefs.current).forEach((menu) => {
        if (menu) {
          gsap.to(menu, { opacity: 1, duration: 0.3 });
        }
      });

  };

  const handleMouseLeave = () => {

      setIsHovered(false);
      Object.values(subMenuRefs.current).forEach((menu) => {
        if (menu) {
          gsap.to(menu, { opacity: 0, duration: 0.3 });
        }
      });
  };

  return { isHovered, handleMouseEnter, handleMouseLeave };
};

export default useHeaderHoverEvent;