import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 딜레이 줘서 렌더링 이후 실행되도록
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
