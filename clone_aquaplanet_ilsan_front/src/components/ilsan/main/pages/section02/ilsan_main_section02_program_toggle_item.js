import gsap from "gsap";
import React, { useCallback } from "react";

const ProgramItems = ({program}) => {
    const toggleItem = useCallback((event, toggle) => {
        const selectedProgram = event.currentTarget;
        const mainTitle = selectedProgram.querySelector(".item-inner-main-title");
        const subTitle = selectedProgram.querySelector(".item-inner-sub-title");
        const innerText = selectedProgram.querySelector(".item-inner-text");
        const link = selectedProgram.querySelector(".program-link");

        if (!mainTitle || !subTitle || !innerText || !link) {
            return;
        }

        gsap.to(selectedProgram, {
            width: toggle ? "660px" : "312px",
            transform: toggle ? "translateX(-348px)" : "translateX(0)",
            boxShadow: toggle ? "0 0 30px 0 rgba(0, 0, 0, 0.5)" : "0 0 0 0",
            zIndex: toggle ? 10 : 1,
            duration: 0.5,
        });
        gsap.to(mainTitle, { opacity: toggle ? 0 : 1, duration: 0 });
        gsap.to([subTitle, innerText, link], { opacity: toggle ? 1 : 0, duration: 0 });
    }, []);

    return (
        <li>
            <div
                className="item-inner"
                style={{ backgroundImage: `url(${program.image})` }}
                onMouseEnter={(e) => toggleItem(e, true)}
                onMouseLeave={(e) => toggleItem(e, false)}
            >
                <span className="item-inner-bg"></span>
                <span className="item-inner-main-title">{program.title}</span>
                <span className="item-inner-sub-title">{program.subtitle}</span>
                <span className="item-inner-text">{program.description}</span>
                <a className="program-link" href="/">
                    자세히 보기
                </a>
            </div>
        </li>
    );
}
export default ProgramItems;