import React, { useEffect, useState } from 'react';

let preScrollTop = 0;

const Scroll: React.FC = () => {
  const [winHeight, setWinHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleWinScroll = () => {
      const scrollTop = document.scrollingElement.scrollTop;
      if (preScrollTop <= 0 && scrollTop >= 1) {
        document.scrollingElement.scrollTo({ top: winHeight, behavior: 'smooth' });
      } else if (preScrollTop >= winHeight && scrollTop < winHeight) {
        document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' });
      }
      preScrollTop = scrollTop;
    };
    document.addEventListener('scroll', handleWinScroll);
    return () => document.removeEventListener('scroll', handleWinScroll);
  }, [winHeight]);

  useEffect(() => {
    const handleWinResize = () => setWinHeight(window.innerHeight);
    window.addEventListener('resize', handleWinResize);
    return () => window.removeEventListener('resize', handleWinResize);
  }, []);
  return null;
};

Scroll.displayName = 'Scroll';

export default Scroll;
