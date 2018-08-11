import { createAction } from "redux-actions";

import * as types from "../contants";
import { MenuItem } from "../interfaces/menu";
import { RssItem, Feed } from "../interfaces/rss";
import { TMenuRssPayload } from "../interfaces/appState";
import Menu from "../services/menu";
import rss from "../services/rss";

const menu = new Menu(Symbol.keyFor(types.MENU_STORAGE_NS));

// action creator 集合
const feedActions = {
  toggleOpenAddFeed: createAction<boolean, boolean>(
    Symbol.keyFor(types.TOGGLE_ADD_FEED),
    (toggle: boolean) => toggle
  ),

  setActiveFeed: createAction<string, string>(
    Symbol.keyFor(types.SET_ACTIVE_FEED),
    (url: string) => url
  ),

  setFeedError: createAction<string, string>(
    Symbol.keyFor(types.SET_FEED_ERROR),
    (msg: string) => msg
  ),

  removeFeed: createAction<Array<MenuItem>, string>(Symbol.keyFor(types.REMOVE_FEED), (url: string) =>
    menu.remove(url)
  ),

  fetchFeed: createAction<Promise<Feed>, string>(
    Symbol.keyFor(types.FETCH_FEED), async (url: string) => await rss(url)
  ),

  addFeed: createAction<Promise<MenuItem[]>, string>(
    Symbol.keyFor(types.ADD_FEED), async (url: string) => {
    if (menu.items.find(item => item.url === url)) {
      throw new Error("This feed is already in the list");
    }
    const feed = await rss(url);
    if (!feed.title) {
      throw new Error("Unsupported format");
    }
    return menu.add(url, feed.title);
  }),

  fetchMenu: createAction<Promise<TMenuRssPayload>, void>(
    Symbol.keyFor(types.FETCH_MENU),
    async () => {
    menu.load();
    // fetch rss => Promise[]
    let promises = menu.items.map(item => rss(item.url));
    return Promise.all(promises).then((feeds: Array<Feed>) => {
      if (!feeds.length) {
        return { menuItems: [], rssItems: [] };
      }
      let all = feeds.map(feed => feed.items)
      .reduce(( acc: RssItem[], items: RssItem[] ) => acc.concat( items ) )
      .sort((a, b) => {
        let ad = new Date(a.pubdate);
        let bd = new Date(b.pubdate);
        return bd.getTime() - ad.getTime();
      }).slice(0, Number(Symbol.keyFor(types.FEED_ITEM_PER_PAGE)));
      return { menuItems: menu.items , rssItems: all }
    });
  }),
}

export default feedActions;
