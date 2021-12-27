/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator';
import { ThemeClassNames } from '@docusaurus/theme-common';
import clsx from 'clsx';

import CardType from '@site/static/svg/card.svg';
import ListType from '@site/static/svg/list.svg';
import NewBlog from '@site/static/svg/new.svg';

import useViewType from '@site/src/hooks/useViewType';

import Banner from './components/banner';
import BlogItem from './components/blog-item';
import style from './index.module.css';

function BlogListPage(props) {
  console.log(props);
  const { metadata, items, sidebar } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  const isFirstPage = metadata.page === 1;
  const [type, setType] = useViewType();

  return (
    <Layout title={title} description={blogDescription} wrapperClassName={ThemeClassNames.wrapper.blogPages}>
      <Banner />

      {/* 展示标题 */}
      {isFirstPage && (
        <h1 className={style.home_news_blog_title}>
          最新博客 &nbsp;
          <NewBlog />
        </h1>
      )}

      {/* 切换列表展示形式 */}
      <div className={style.home_switch_view}>
        <CardType
          onClick={() => setType('card')}
          className={clsx(style.home_switch_items, { [style.home_switch_items_selected]: type === 'card' })}
        />
        <ListType
          onClick={() => setType('list')}
          className={clsx(style.home_switch_items, { [style.home_switch_items_selected]: type === 'list' })}
        />
      </div>

      {/* 博客列表 */}
      <div className={style.home_blogList_container}>
        {items.map(({ content: BlogPostContent }) => (
          <div
            key={BlogPostContent.metadata.permalink}
            className={clsx(style.home_blogItem, {
              [style.home_blogItem_card]: type === 'card',
              [style.home_blogItem_list]: type === 'list',
            })}
          >
            <BlogItem type={type} {...BlogPostContent.metadata}>
              <BlogPostContent />
            </BlogItem>

            {/* <BlogPostItem
              frontMatter={BlogPostContent.frontMatter}
              assets={BlogPostContent.assets}
              metadata={BlogPostContent.metadata}
              truncated={BlogPostContent.metadata.truncated}
            >
              <BlogPostContent />
            </BlogPostItem> */}
          </div>
        ))}
      </div>

      <BlogListPaginator metadata={metadata} />
    </Layout>
  );
}

export default BlogListPage;
