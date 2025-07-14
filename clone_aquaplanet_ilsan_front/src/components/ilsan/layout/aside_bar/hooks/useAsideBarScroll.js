import { useCallback, useEffect, useState } from "react";

const useAsideBarScroll = (eventItemBoxRef, eventListOpen, asideRef, isInMainPage) => {
    const [isFixActive, setIsFixActive] = useState(false);

    const blockInnerScroll = useCallback((e) => {
        if (!eventListOpen) {
            return;
        }
    
        e.preventDefault();
        e.stopPropagation();
    
        if (eventItemBoxRef.current) {
            eventItemBoxRef.current.scrollTop += e.deltaY;
        }
    }, [eventListOpen, eventItemBoxRef]);

    useEffect(() => {
        const box = eventItemBoxRef?.current; 
        if (box) {
            box.addEventListener("wheel", blockInnerScroll, { passive: false });
        }

        return () => {
            if (box) {
                box.removeEventListener("wheel", blockInnerScroll);
            }
        };
    }, [blockInnerScroll, eventItemBoxRef]);

    useEffect(() => {
        if(!isInMainPage){
            const ActiveAsideByScroll = () => {
                const scrollPoint = window.pageYOffset || document.documentElement.scrollTop;

                if(scrollPoint > 200){
                    setIsFixActive(true);
                }
                else if(scrollPoint <= 790){
                    setIsFixActive(false);
                }
            }

            ActiveAsideByScroll();
            window.addEventListener("scroll", ActiveAsideByScroll);
            return () => window.removeEventListener("scroll", ActiveAsideByScroll);
        }

    },[asideRef, isInMainPage])

    return{isFixActive};
}
export default useAsideBarScroll;