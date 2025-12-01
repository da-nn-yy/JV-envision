import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force instant scroll
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Restore smooth scroll after a small delay if needed, or just leave it 'auto' for route changes?
    // The user wants "without animation automatically start from top".
    // If I leave it as is, it might affect in-page anchor links if they rely on global smooth scroll.
    // But for route changes, it must be instant.
    // Let's just set it to instant for the scroll action.
  }, [pathname]);

  return null;
};

export default ScrollToTop;
