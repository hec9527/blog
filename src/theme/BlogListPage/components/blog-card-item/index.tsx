import React, { useMemo } from 'react';
import Tag from '@site/static/svg/tag.svg';
import style from './index.module.css';

interface BlogItemsProps {
  title: string;
  authors?: { imageURL?: string; name?: string; title?: string; url?: string }[];
  tags: readonly { label: string; permalink: string }[];
  readingTime?: number;
  permalink: string;
  date: string;
}

const BlogItems: React.FC<BlogItemsProps> = (props) => {
  const date = useMemo(() => {
    const dateArr = new Date(props.date).toLocaleDateString().split('/');
    return [dateArr.pop().toString(), `${dateArr[0]}年${dateArr[1]}月`];
  }, [props.date]);

  return (
    <div className={style.blog_items}>
      <div className={style.blog_items_matter}>
        <div className={style.blog_items_date}>
          <div className={style.blog_items_day}>{date[0]}</div>
          <div className={style.blog_items_month}>{date[1]}</div>
        </div>
      </div>
      <article className={style.blog_items_content}>
        <header>
          <h2 className={style.blog_items_title}>
            <a href={props.permalink}>{props.title}</a>
          </h2>
          <div className={style.blog_items_author}>
            <a href={props.authors[0].url} target='_blank'>
              <img className={style.blog_items_avatar} src={props.authors[0].imageURL} alt='author-avatar' />
            </a>
            <div className={style.blog_items_author_info}>
              <a href={props.authors[0].url} target='_blank'>
                {props.authors[0].name}
              </a>
              <div>{props.authors[0].title}</div>
            </div>
            <div className={style['blog-items_readTime']}>阅读时间：{Math.ceil(props.readingTime)}分钟</div>
          </div>
        </header>

        <div className={style.blog_items_tags}>
          <a href='/tags' className={style.blog_items_tags_icon}>
            <Tag />
          </a>
          {props.tags.map((tag) => (
            <a href={tag.permalink} key={tag.label} data-label='tag' title={tag.label}>
              {tag.label}
            </a>
          ))}
        </div>

        {props.children}

        <footer className={style.blog_items_footer}>
          <a className={style.blog_items_readMore} href={props.permalink} aria-label={'阅读' + props.title}>
            阅读全文
          </a>
        </footer>
      </article>
    </div>
  );
};

BlogItems.displayName = 'BlogItems';

export default BlogItems;
