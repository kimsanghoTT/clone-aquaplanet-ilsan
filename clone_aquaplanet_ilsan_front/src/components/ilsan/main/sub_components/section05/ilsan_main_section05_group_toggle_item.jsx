import React, { useCallback } from 'react';
import gsap from 'gsap';

const GroupItems = ({ item }) => {
    const toggleGroupTap = useCallback((event, isActive) => {
        const selectedTap = event.currentTarget;
        const ico = selectedTap.querySelector(".ico");
        const title = selectedTap.querySelector(".group-card-title");
        const text = selectedTap.querySelector(".group-card-text");
        const link = selectedTap.querySelector("a");

        if (!ico || !title || !text || !link) {
            return;
        }

        gsap.to(selectedTap, { background: isActive ? "#3366FF" : "rgba(255, 255, 255, 0.15)", duration: 0.6 });
        gsap.to(ico, { opacity: isActive ? 1 : 0.5, y: isActive ? -30 : 0, duration: 0.6 });
        gsap.to(title, { y: isActive ? -55 : 0, duration: 0.6 });
        gsap.to(text, { y: isActive ? -55 : 0, duration: 0.6 });
        gsap.to(link, { opacity: isActive ? 1 : 0, y: isActive ? -20 : 0, duration: 0 });
    }, []);

    return (
        <div
            className="group-item"
            onMouseEnter={(e) => toggleGroupTap(e, true)}
            onMouseLeave={(e) => toggleGroupTap(e, false)}
        >
            <span className="ico"></span>
            <span className="group-card-title">{item.title}</span>
            <span className="group-card-text">
                {item.text.split("/").map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                        {line}
                        <br/>
                    </React.Fragment>
                ))}
            </span>
            <a href='/'>자세히 보기</a>
        </div>
    );
};

export default GroupItems;