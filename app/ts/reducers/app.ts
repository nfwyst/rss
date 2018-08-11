import { handleActions, Action } from "redux-actions";
import { TAppState, TMenuRssPayload } from "../interfaces/appState";
import * as types from "../contants";

// 初始状态
const initState: TAppState = {
  isOpenAddFeed: false,
  menu: [],
  items: [],
  feedError: "",
  activeFeedUrl: ""
};

// reducers 集合
const app = handleActions<any>({
    [Symbol.keyFor(types.TOGGLE_ADD_FEED)]: (state, action) => ({
      ...state,
      isOpenAddFeed: action.payload
    }),

    [Symbol.keyFor(types.ADD_FEED)]: (state, action) => {
      if (action.error) {
        return { ...state, feedError: `Cannot add feed: ${action.payload}` };
      }
      return {
        ...state,
        feedError: "",
        isOpenAddFeed: false,
        menu: action.payload
      };
    },

    [Symbol.keyFor(types.SET_FEED_ERROR)]: (state, action) => ({
      ...state,
      feedError: action.payload
    }),

    [Symbol.keyFor(types.REMOVE_FEED)]: (state, action) => {
      if (action.error) {
        return { ...state, feedError: `Cannot remove feed: ${action.payload}` };
      }
      return { ...state, menu: action.payload };
    },
    [Symbol.keyFor(types.FETCH_MENU)]: (state, action: Action<TMenuRssPayload>) => {
      if (action.error) {
        return { ...state, feedError: `Cannot fetch menu: ${action.payload}` };
      }
      return {
        ...state,
        menu: action.payload.menuItems,
        items: action.payload.rssItems,
        activeFeedUrl: ""
      };
    },

    [Symbol.keyFor(types.FETCH_FEED)]: (state, action) => {
      if (action.error) {
        return { ...state, feedError: `Cannot fetch feed: ${action.payload}` };
      }
      return { ...state, items: action.payload.items };
    },

    [Symbol.keyFor(types.SET_ACTIVE_FEED)]: (state, action) => ({
      ...state,
      activeFeedUrl: action.payload
    })
  },
  initState
);

export default app;
