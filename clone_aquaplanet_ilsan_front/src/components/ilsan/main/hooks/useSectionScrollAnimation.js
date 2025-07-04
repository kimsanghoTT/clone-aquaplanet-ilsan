import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const useSectionScrollAnimation = (
  sectionRef,
  titleSelector,
  contentSelector
) => {
  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const sectionTitle = sectionRef.current.querySelectorAll(titleSelector);
    const sectionContent = sectionRef.current.querySelectorAll(contentSelector);

    gsap.fromTo(
      sectionTitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 30%" },
      }
    );

    gsap.fromTo(
      sectionContent,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 30%" },
      }
    );
  }, [sectionRef, titleSelector, contentSelector]);
};
export default useSectionScrollAnimation;
