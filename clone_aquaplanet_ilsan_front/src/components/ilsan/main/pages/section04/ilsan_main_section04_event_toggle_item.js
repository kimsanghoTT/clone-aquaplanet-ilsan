// src/components/sections/Section04Event/EventItem.js (새 파일 생성 예시 경로)
import React, { useCallback } from 'react';
import gsap from 'gsap'; // EventItem 컴포넌트에서 GSAP 사용을 위해 임포트

const EventItems = ({ item }) => {
    const toggleEventTap = useCallback((event, isActive) => {
        const selectedTap = event.currentTarget;
        const ico = selectedTap.querySelector(".ico");
        const title = selectedTap.querySelector(".event-card-title");
        const text = selectedTap.querySelector(".event-card-text");
        const link = selectedTap.querySelector("a");

        if (!ico || !title || !text || !link) {
            console.warn("EventItem: GSAP 애니메이션 대상 요소 중 하나를 찾을 수 없습니다.");
            return;
        }

        gsap.to(selectedTap, {
            background: isActive ? "#3366FF" : "rgba(255, 255, 255, 0.15)",
            duration: 0.6,
        });

        gsap.to(ico, { opacity: isActive ? 1 : 0.5, y: isActive ? -50 : 0, duration: 0.6 });
        gsap.to(title, { y: isActive ? -80 : 0, duration: 0.6 });
        gsap.to(text, { y: isActive ? -80 : 0, duration: 0.6 });
        gsap.to(link, { opacity: isActive ? 1 : 0, y: isActive ? -20 : 0, duration: 0 }); // duration 0은 즉시 변경
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

export default EventItems;