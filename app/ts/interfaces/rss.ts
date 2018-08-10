// RssItem 项接口
export interface RssItem {
  description: string;
  link: string;
  pubdate: string;
  title: string;
}

// Feed 接口
export interface Feed {
 title: string,
 items: Array<RssItem>
}
