import gsap from "gsap";
import { useEffect } from "react";

const useScrollToTop = () => {

    useEffect(() => {
        const topBtnScrollEvent = () => {
        const scrollOnTop =
            window.pageYOffset || document.documentElement.scrollTop;

        if (scrollOnTop === 0) {
            gsap.to(".top-btn", { opacity: 0, duration: 0.6 });
        } else if (scrollOnTop !== 0) {
            gsap.to(".top-btn", { opacity: 1, duration: 0.6 });
        }
        };
        window.addEventListener("scroll", topBtnScrollEvent);

        return () => {
        window.removeEventListener("scroll", topBtnScrollEvent);
        };
    }, []);

    const backToTop = () => {
        window.scroll({
        top: 0,
        behavior: "smooth",
        });
    };

    return {backToTop};
}
export default useScrollToTop;