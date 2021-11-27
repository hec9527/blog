import React, { useEffect } from 'react';
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

const GitTalkCommit: React.FC = () => {
  useEffect(() => {
    new Gitalk({
      admin: ['hec9527'],
      clientID: 'b7a69103e09aed1d4ac9',
      clientSecret: 'bc278325718ff1cc5485642e937ea5c750957d94',
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
