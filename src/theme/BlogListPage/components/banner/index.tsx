import React from 'react';
import style from './index.module.css';
import BgSrc from '@site/static/img/home-bg.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faWeixin, faZhihu, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

const HomeBanner: React.FC = () => {
  return (
    <div className={style.banner_container}>
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
    </div>
  );
};

HomeBanner.displayName = 'HomeBanner';

export default HomeBanner;
