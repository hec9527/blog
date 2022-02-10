import React from 'react';
import NewBlog from '@site/static/svg/new.svg';
import style from './index.module.css';

const Title: React.FC = () => (
  <h1 className={style.home_news_blog_title}>
    所有博客 &nbsp;
    <NewBlog />
  </h1>
);

Title.displayName = 'Title';

export default Title;
