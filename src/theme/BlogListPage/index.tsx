/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogListPaginator from '@theme/BlogListPaginator';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/BlogListPage';
import clsx from 'clsx';

import CardType from '@site/static/svg/card.svg';
import ListType from '@site/static/svg/list.svg';
import useViewType from '@site/src/hooks/useViewType';

import style from './index.module.css';
import Title from './components/title';
// import Banner from './components/banner';
import RecentPost from './components/recent-post';
import BlogCardItem from './components/blog-card-item';
import BlogListItem from './components/blog-list-item';

import Banner1 from '../../components/banner';

function BlogListPage(props: Props): JSX.Element {
  const { metadata, items, sidebar } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  const isFirstPage = metadata.page === 1;
  const [type, setType] = useViewType();

  // console.log({ metadata, items, props });

  return (
    <Layout title={title} description={blogDescription} wrapperClassName={ThemeClassNames.wrapper.blogPages}>
      {/* {isFirstPage && <Banner />} */}
      {isFirstPage && <Banner1 />}

      <main className={style.home_main_container}>
        <div className={style.home_blogPost_container}>
          <Title />
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
          <div
            className={clsx({
              [style.home_blogList_card]: type === 'card',
              [style.home_blogList_list]: type === 'list',
            })}
          >
            {items.map(({ content: BlogPostContent }) => (
              <div className={clsx(style.home_blogItem)} key={BlogPostContent.metadata.permalink}>
                {type === 'card' ? (
                  <BlogCardItem {...BlogPostContent.metadata}>
                    <BlogPostContent />
                  </BlogCardItem>
                ) : (
                  <BlogListItem {...BlogPostContent.metadata} />
                )}
              </div>
            ))}
          </div>
          <BlogListPaginator metadata={metadata} />
        </div>

        <aside className={style.home_recent_post}>
          <RecentPost data={sidebar} size={5} />
        </aside>
      </main>
    </Layout>
  );
}

export default BlogListPage;
