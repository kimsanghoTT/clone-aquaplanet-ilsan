import React, { useCallback } from 'react';
import gsap from 'gsap';

const EventItems = ({ item }) => {
    const toggleEventTap = useCallback((event, isActive) => {
        const selectedTap = event.currentTarget;
        const ico = selectedTap.querySelector(".ico");
        const title = selectedTap.querySelector(".event-card-title");
        const text = selectedTap.querySelector(".event-card-text");
        const link = selectedTap.querySelector("a");

        if (!ico || !title || !text || !link) {
            return;
        }

        gsap.to(selectedTap, {
            background: isActive ? "#3366FF" : "rgba(255, 255, 255, 0.15)",
            duration: 0.6,
        });

        gsap.to(ico, { opacity: isActive ? 1 : 0.5, y: isActive ? -50 : 0, duration: 0.6 });
        gsap.to(title, { y: isActive ? -80 : 0, duration: 0.6 });
        gsap.to(text, { y: isActive ? -80 : 0, duration: 0.6 });
        gsap.to(link, { opacity: isActive ? 1 : 0, y: isActive ? -20 : 0, duration: 0 }); 
    }, []);

    return (
        <div
            className="event-item"
            onMouseEnter={(e) => toggleEventTap(e, true)}
            onMouseLeave={(e) => toggleEventTap(e, false)}
        >
            <span className="ico"></span>
            <span className="event-card-title">{item.title}</span>
            <span className="event-card-text">
                {item && item.text.split("/").map((line, lineIndex) => (
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

export default EventItems;