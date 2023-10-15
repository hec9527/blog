import React from 'react';
import style from './index.module.css';
import Poster from '@site/static/svg/poster.svg';
import { animated, useTrail } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faWeixin, faZhihu, faStackOverflow, faQq } from '@fortawesome/free-brands-svg-icons';

const Banner: React.FC = () => {
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  });

  return (
    <div className={style.banner_container}>
      <div className={style.banner_intro}>
        <animated.div style={animatedTexts[0]} className={style.banner_greeting}>
          <span>Hello! 我是</span>
          <span className={style.banner_name}>
            <span>Hec9527</span>
          </span>
        </animated.div>
        <animated.p style={animatedTexts[1]} className={style.banner_intro_text}>
          欢迎访问我的博客，这里有专业的技术分析，代码实现以及问题排查，希望对你的工作和学习有所启发
        </animated.p>
        <animated.div style={animatedTexts[4]} className={style.banner_contact}>
          <a href='https://www.zhihu.com/people/hec9527' target='_blank'>
            <FontAwesomeIcon icon={faZhihu} size='lg' />
          </a>
          <a href='https://github.com/hec9527' target='_blank'>
            <FontAwesomeIcon icon={faGithub} size='lg' />
          </a>
          <a href='https://stackoverflow.com/users/11867107/%e5%8d%a1%e8%a5%bf%e8%8e%ab%e5%a4%9a' target='_blank'>
            <FontAwesomeIcon icon={faStackOverflow} size='lg' />
          </a>
          <a href='' target='_blank'>
            <FontAwesomeIcon icon={faQq} size='lg' />
          </a>
          <a href='https://weixin.qq.com/' target='_blank'>
            <FontAwesomeIcon icon={faWeixin} size='lg' />
          </a>
        </animated.div>
      </div>

      <animated.div className={style.banner_poster}>
        <Poster id='freepik_stories-mobile-life' />
      </animated.div>
    </div>
  );
};

Banner.displayName = 'Banner';

export default Banner;
