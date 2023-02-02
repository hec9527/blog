import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Top from '@site/static/svg/top.svg';
import style from './index.module.css';

const BackToTop: React.FC = () => {
  const [hide, setHide] = useState(false);

  const handleBackTopClick = () => {
    // document.scrollingElement?.scrollTo({ behavior: 'smooth', top: 0 });
    document.scrollingElement?.scrollTo({ behavior: 'auto', top: 0 });
  };

  useEffect(() => {
    const handleWinScroll = () => {
      const scrollTop = document.scrollingElement.scrollTop;
      setHide(scrollTop < 500);
    };
    document.addEventListener('scroll', handleWinScroll);
    return () => document.removeEventListener('scroll', handleWinScroll);
  }, []);

  return <Top className={clsx(style.scroll_top, { [style.scroll_top_hide]: hide })} onClick={handleBackTopClick} />;
};

BackToTop.displayName = 'BackToTop';

export default BackToTop;
