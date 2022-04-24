import React from 'react';
import style from './index.module.css';
import BgSrc from '@site/static/img/home-bg.jpeg';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faWeixin, faZhihu, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import Scroll from '../scroll';

const HomeBanner: React.FC = () => {
  return (
    <div className={style.banner_container}>
      <BrowserOnly>{() => <Scroll />}</BrowserOnly>

      <img className={style.banner_img} src={BgSrc} alt='logo' />
      <div className={style.banner_content}>
        <h1>Hec9257的博客</h1>
        <p>永远怀揣着一个信念：技术改变生活</p>
        <div className={style.social_links}>
          关注我：
          <a href='https://www.zhihu.com/people/dream-begger' target='_blank'>
            <FontAwesomeIcon icon={faZhihu} size='lg' />
          </a>
          <a href='https://github.com/hec9527' target='_blank'>
            <FontAwesomeIcon icon={faGithub} size='lg' />
          </a>
          <a href='https://stackoverflow.com/users/11867107/%e5%8d%a1%e8%a5%bf%e8%8e%ab%e5%a4%9a' target='_blank'>
            <FontAwesomeIcon icon={faStackOverflow} size='lg' />
          </a>
          <a href='https://weixin.qq.com/' target='_blank'>
            <FontAwesomeIcon icon={faWeixin} size='lg' />
          </a>
        </div>
      </div>

      <div className={style.wave_divider}>
        <svg
          className={style.wave_svg}
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1500 150'
          preserveAspectRatio='none'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            fill='#ffffff'
          />
        </svg>
      </div>
    </div>
  );
};

HomeBanner.displayName = 'HomeBanner';

export default HomeBanner;
