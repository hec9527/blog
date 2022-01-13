module.exports = function (context, options) {
  return {
    name: 'docusaurus-baidu-analytics-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?cdd8f1478214bc5a9a0e4edf406f8a75";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
          },
          // {
          //   tagName: 'meta',
          //   attributes: {
          //     name: 'baidu-site-verification',
          //     content: 'ssssssss',
          //   },
          // },
        ],
      };
    },
  };
};
