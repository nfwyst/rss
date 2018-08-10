const request = require('request')
const FeedMe = require('feedme');

function createFeedParserStream(feed: any) {
  const parser = new FeedMe(true);
  parser.on('title', title => {
    feed.title = title;
  });
  parser.on('item', item => {
    feed.items.push(item);
  });

  return parser;
}

function rss(url: any) {
  return new Promise((resolve, reject) => {
    const feed = {
      title: '',
      items: []
    };
    // 创建一个 feed 流
    const parser:(any) = createFeedParserStream(feed);
    request.get(url).on('error', (err) => {
      reject(err);
    }).on('end', () => {
      resolve(feed);
    }).pipe( parser );
  });
}

(async () => {
  try {
    let res = await rss("http://feeds.feedburner.com/CssTricks");
    console.log(res);
  } catch (err) {
    console.error(err.message);
  }
})();
