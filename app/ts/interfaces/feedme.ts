import { RssItem } from './rss';

// FeedMe Class 接口
export interface TFeedMe  {
  new (flag?: boolean): NodeJS.WritableStream;
  on(event: 'title', onTitle: (title: string) => void) : void;
  on(evnet: 'item', onItem: (item: RssItem) => void) : void;
}
