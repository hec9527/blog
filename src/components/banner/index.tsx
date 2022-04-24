import React from 'react';
// import {} from 'react-spring';
import style from './index.module.css';
import Poster from '@site/static/svg/poster.svg';
import './poster.css';

const Banner: React.FC = () => {
  return (
    <div className={style.banner_container}>
      <div className={style.banner_intro}>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
      </div>
      <div className={style.banner_poster}>
        <Poster id='freepik_stories-mobile-life' />
      </div>
    </div>
  );
};

Banner.displayName = 'Banner';

export default Banner;
