import React, { useEffect, useRef } from "react";

const ScrollGuide = () => {
    const guideRef = useRef(null);

    useEffect(() => {
    const scrollEvent = () => {
        const currentScrollPoint = window.pageYOffset || document.documentElement.scrollTop;
        const scrollOnBottom = document.documentElement.scrollHeight - currentScrollPoint - window.innerHeight;

        guideRef.current.style.display = scrollOnBottom <= 0 ? "none" : "block";
    }

    document.addEventListener("scroll", scrollEvent);

    return() => document.removeEventListener("scroll", scrollEvent);
    },[])

    return(
        <div className="scroll-guide" ref={guideRef}>
            <span className="scroll-box">
                <em className="ico1" aria-hidden="true"></em>
                <em className="ico2" aria-hidden="true"></em>
                <span className="text">SCROLL</span>
            </span>
        </div>
    )
}
export default ScrollGuide;