/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import BackTop from '@site/src/components/back-to-top';
import style from './index.module.css';

import type { Props } from '@theme/BlogLayout';

function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className='container margin-vert--lg'>
        <div className='row' style={{ justifyContent: 'center' }}>
          <main
            className={clsx('col', {
              'col--7': hasSidebar,
              'col--9 col--offset-1': !hasSidebar,
            })}
            itemScope
            itemType='http://schema.org/Blog'
          >
            {children}
          </main>

          <div className={clsx('col col--3', style.custom_sidebar_container)}>
            {hasSidebar && <BlogSidebar sidebar={sidebar!} />}
            {toc && (
              <div className={style.custom_sidebar_TOC}>
                <h3>目录</h3>
                {toc}
              </div>
            )}
          </div>
        </div>
      </div>
      <BackTop />
    </Layout>
  );
}

export default BlogLayout;
