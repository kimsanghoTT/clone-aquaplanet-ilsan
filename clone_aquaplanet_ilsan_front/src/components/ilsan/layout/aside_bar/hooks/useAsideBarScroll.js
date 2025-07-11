import { useCallback, useEffect } from "react";

const useAsideBarScroll = (eventItemBoxRef, eventListOpen) => {

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
}
export default useAsideBarScroll;