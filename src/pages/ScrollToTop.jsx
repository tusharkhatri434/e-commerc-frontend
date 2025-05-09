import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ()=> {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top-left corner
  }, [pathname]);

  return null; // No UI, just logic
}

export default ScrollToTop;