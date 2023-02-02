import clsx from 'clsx';
import React from 'react';
import style from './index.module.css';

interface Props {
  size?: number;
  data: {
    title: string;
    items: SideBarItem[];
  };
}

const RecentPost: React.FC<Props> = ({ data: { items, title }, size }) => {
  return (
    <div className={style.recent_post_container}>
      <h3>{title}</h3>
      <ul className={clsx(style.recent_post_content, 'tableOfContents_vrFS')}>
        {items.map((item) => (
          <li key={item.permalink} className={style.recent_post_item}>
            <a className={style.recent_post_link} href={item.permalink}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

RecentPost.displayName = 'RecentPost';
RecentPost.defaultProps = {
  size: 5,
};

export default RecentPost;
