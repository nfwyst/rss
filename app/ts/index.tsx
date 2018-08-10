// 全局导入, 不支持按需加载
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
