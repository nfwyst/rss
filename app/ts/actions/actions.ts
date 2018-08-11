import { createAction } from "redux-actions";

import * as types from "../contants";
import { MenuItem } from "../interfaces/menu";
import { RssItem, Feed } from "../interfaces/rss";
import { TMenuRssPayload } from "../interfaces/appState";
import Menu from "../services/menu";
import rss from "../services/rss";

export const menu = new Menu(Symbol.keyFor(types.MENU_STORAGE_NS));

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

  removeFeed: createAction<Array<MenuItem>, string>(
    Symbol.keyFor(types.REMOVE_FEED),
    (url: string) => menu.remove(url)
  ),

  fetchFeed: createAction<Promise<Feed>, string>(
    Symbol.keyFor(types.FETCH_FEED),
    async (url: string) => await rss(url)
  ),

  addFeed: createAction<Promise<MenuItem[]>, string>(
    Symbol.keyFor(types.ADD_FEED),
    async (url: string) => {
    // 如果已经添加了源, 则无需再次添加
    if(menu.items.find(item => item.url === url)) {
      return menu.items;
    }
    console.log(localStorage.getItem('curUrl'));
    // 如果在异步执行结束之前多次添加则无效
    if(!localStorage.getItem('curUrl')) {
      localStorage.setItem('curUrl', url);
    } else {
      if(localStorage.getItem('curUrl') === url) {
        return menu.items;
      }
    }
    const feed = await rss(url);
    if (!feed.title) {
      throw new Error("Unsupported format");
    }
    return menu.add(url, feed.title);
  }),

  fetchMenu: createAction<Promise<TMenuRssPayload>, number>(
    Symbol.keyFor(types.FETCH_MENU),
    async (index: number) => {
    let curMenu = menu.load(index);
    if (!curMenu || index < 0) return { menuItems: [], rssItems: [] };
    console.log(index);
    let feed = null;
    try {
      feed = await rss(curMenu.url);
      if(!feed || !feed.items.length) {
        return { menuItems: [], rssItems: [] };
      }
      let rssItems = feed.items.sort((a, b) => {
        let ad = new Date(a.pubdate);
        let bd = new Date(b.pubdate);
        return bd.getTime() - ad.getTime();
      }).slice(0, Number(Symbol.keyFor(types.FEED_ITEM_PER_PAGE)));
      localStorage.setItem('curUrl', null);
      return { menuItems: menu.items , rssItems }
    } catch (err) {
      throw new Error(err);
    }
  }),
}

export default feedActions;
