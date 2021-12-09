import React, { useEffect } from 'react';
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

const GitTalkCommit: React.FC = () => {
  useEffect(() => {
    new Gitalk({
      admin: ['hec9527'],
      clientID: '776945e61c309bf840cb',
      clientSecret: '1488e71a045da725e1d167bb57775ec744c66936',
      repo: 'blog',
      owner: 'hec9527',
      id: 'hec9527-blog',
      distractionFreeMode: true,
    }).render('gitalk-container');
  }, []);

  return <div id='gitalk-container' />;
};

GitTalkCommit.displayName = 'GitTalkCommit';

export default GitTalkCommit;
