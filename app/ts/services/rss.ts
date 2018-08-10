import { TFeedMe } from '../interfaces/feedme';
import { Feed, RssItem } from '../interfaces/rss';
import * as request from 'request'

// 导入 FeedMe 并满足 TFeedMe 接口定义: new/on->title/on->item
const FeedMe: TFeedMe = require('feedme');

// 创建 feed 流, 返回 node.js 可写流
function createFeedParserStream(feed: Feed): NodeJS.WritableStream {
  const parser = new FeedMe(true);
  // feed title 类型为 string
  parser.on('title', (title: string) => {
    feed.title = title;
  });
  // feed item 类型为 RssItem
  parser.on('item', (item: RssItem) => {
    feed.items.push(item);
  });
  // 其他错误
  parser.on('error', (err: Error) => {
    console.error(err.message);
  });

  return parser;
}

// 默认导出 rss 函数
/**
 * @return Promise<Feed>
 * @param url rss url
 */
export default function rss(url: string): Promise<Feed> {
  const feed: Feed = {
    title: '',
    items: []
  };
  return new Promise((resolve: (feed: Feed) => void, reject: (err: Error) => void) => {
    request.get(url).on('error', (err: Error) => {
      reject(err);
    }).on('end', () => {
      resolve(feed);
    }).pipe(createFeedParserStream(feed));
  });
}

(async () => {
  try {
    let res: Feed = await rss("https://www.oclc.org/content/marketing/publish/zh_cn/rss/metadata-feed.rss");
    console.log(res);
  } catch (err) {
    console.error(err.message);
  }
})();
