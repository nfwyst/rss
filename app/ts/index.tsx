// 全局导入, 不支持按需加载
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";
import "app.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import appReducers from './reducers/index';

const store = createStore(
  appReducers,
  compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : i => i
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App {...this.props} />
  </Provider>,
  document.getElementById("root")
);
