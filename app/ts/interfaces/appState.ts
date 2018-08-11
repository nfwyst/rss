import { MenuItem } from "./menu";
import { RssItem, Feed } from "./rss";
import { Action } from 'redux-actions';


export interface TMenuRssPayload {
  menuItems: Array<MenuItem>;
  rssItems: Array<RssItem>;
}

// 定义整个 APP 的状态
export interface TAppState {
  isOpenAddFeed: boolean;
  menu: Array<MenuItem>;
  items: Array<RssItem>;
  feedError: string;
  activeFeedUrl: string;
}

// action creator 接口 指定 payload 类型
export interface TAppActions {
  toggleOpenAddFeed: (toggle: boolean) => Action<boolean>;
  setActiveFeed: (url: string) => Action<string>;
  setFeedError: (msg: string) => Action<string>;
  fetchMenu: () => Promise<TMenuRssPayload>;
  addFeed: (url: string) => Promise<Array<MenuItem>>;
  removeFeed: (url: string) => Promise<Array<MenuItem>>;
  fetchFeed: (url: string) => Promise<Feed>;
}
