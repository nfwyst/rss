import * as React from 'react';
import { Layout, Content } from 'react-mdl';

import TitleBar from '../components/TitleBar';
import Menu from '../components/Menu';
import Feed from '../components/Feed';

// Component 属于泛型, 这里不需要 State Props 设置为空对象
export default class extends React.Component<{}, {}> {
  render() {
    return (
      <div className="main-wrapper">
        <Layout fixedHeader fixedDrawer>
          {/* 头部导航 */}
          <TitleBar />
          {/* 侧边菜单栏 */}
          <Menu />
          {/* 主内容区域 */}
          <Content>
            <Feed />
          </Content>
        </Layout>
      </div>
    )
  }
}
