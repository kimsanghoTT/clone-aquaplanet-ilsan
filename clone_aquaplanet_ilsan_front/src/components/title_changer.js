import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleChanger = () => {
  const location = useLocation();

    useEffect(() => {
      const link = document.querySelector("link[rel~='icon']");
      const title = document.querySelector("title");
  
      if (location.pathname.startsWith("/aquaplanet/ilsan")) {
        link.href = '/favicon01.ico'; 
        title.textContent = "아쿠아플라넷 일산";
      } else if (location.pathname.startsWith("/aquaplanet")) {
        link.href = '/favicon02.ico'; 
        title.textContent = "아쿠아플라넷몰";
      } else {
      }
    }, [location.pathname])

    return null;
}   
export default TitleChanger;