import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const usePlanetPagination = (sections, paginationRef) => {
  const [navigateSection, setNavigateSection] = useState("planet01");
  const scrollingRef = useRef(false);
  const observer = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(".planet-pagination", { x: -98 }, { x: 0, duration: 1 });
  }, []);

  //요소 관찰 로직. IntersectionObserver. 요즘은 이거 쓴다고 한다.
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",

      //뷰포트에 어느정도 들어오면 반응할 것인가. 0이면 보이자마자 바로
      threshold: 0.1,
    };

    //실제 관찰로직 --> 관찰로직을 먼저 만들고 관찰 대상을 나중에 지정.
    observer.current = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {
        //만약 관찰 대상중에 누군가가 뷰포트에 들어오면
        if (!scrollingRef.current && entry.isIntersecting) {
          setNavigateSection(entry.target.id);
        }
      });
    }, options);

    //관찰할 대상 지정. 관찰 대상은 한 번에 여러개 등록할 수 있음.
    sections.forEach((section) => {
      const id = document.getElementById(section.id);
      if (id) {
        observer.current.observe(id);
      }
    });

    return () => observer.current?.disconnect();
  }, [sections]);

  useEffect(() => {
    const scrollEvent = () => {
      const currentScrollPoint =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollOnBottom =
        document.documentElement.scrollHeight -
        currentScrollPoint -
        window.innerHeight;

      paginationRef.current.style.display =
        scrollOnBottom <= 0 ? "none" : "block";
    };

    document.addEventListener("scroll", scrollEvent);

    return () => document.removeEventListener("scroll", scrollEvent);
  }, [paginationRef]);



  const scrollToSection = (sectionName) => {
    const sectionId = document.getElementById(sectionName);
    if (sectionId) {
      scrollingRef.current = true;
      sectionId.scrollIntoView({ behavior: "smooth", block: "start" });
      setNavigateSection(sectionName);
    }
    setTimeout(() => {
      scrollingRef.current = false;
    }, 700);
  };

  return{scrollToSection, navigateSection}
};
export default usePlanetPagination;
