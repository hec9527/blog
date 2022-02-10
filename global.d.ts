declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';

declare type ViewType = 'card' | 'list';

declare interface SideBarItem {
  title: string;
  permalink: string;
}

declare interface PostItem {
  content: {
    assets: { authorsImageUrls: string[] };
    contentTitle?: string;
    frontMatter: {
      author: string;
      author_image_url: string;
      author_title: string;
      description: string;
      keywords: string[];
      tags: string[];
      title: string;
    };
    isMDXComponent: boolean;
    metadata: {
      authors: {
        imageURL: string;
        name: string;
        title: string;
        url: string;
      }[];
      date: string;
      description: string;
      editUrl: string;
      formattedDate: string;
      nextItem: {
        permalink: string;
        title: string;
      };
      permalink: string;
      prevItem: {
        permalink: string;
        title: string;
      };
      readingTime: number;
      source: string;
      tags: string[];
      title: string;
      truncated: boolean;
    };
    toc: string[];
  };
}
