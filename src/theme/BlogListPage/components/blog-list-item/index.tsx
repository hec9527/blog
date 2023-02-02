import React from 'react';
import style from './index.module.css';

interface BlogItemsProps {
  title: string;
  tags: readonly { label: string; permalink: string }[];
  permalink: string;
  date: string;
}

const BlogItems: React.FC<BlogItemsProps> = (props) => {
  return (
    <div className={style.blog_items}>
      <header>
        <h2>
          <a className={style.blog_items_title} href={props.permalink}>
            {props.title}
          </a>
        </h2>
      </header>
      <footer className={style.blog_items_footer}>
        <div className={style.blog_items_tags}>
          {props.tags.slice(0, 5).map((tag) => (
            <a className={style.blog_items_tag} href={tag.permalink} key={tag.label}>
              {tag.label}
            </a>
          ))}
        </div>
        <div className={style.blog_items_readTime}>{new Date(props.date).toLocaleDateString().replace(/\//g, '-')}</div>
      </footer>
      {/*  */}
    </div>
  );
};

BlogItems.displayName = 'BlogItems';

export default BlogItems;
