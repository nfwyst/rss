import * as React from 'react';
import { Layout, Content } from 'react-mdl';

import TitleBar from '../components/TitleBar';
import Menu from '../components/Menu';
import Feed from '../components/Feed';
import actions from '../actions/actions';
import { connect } from 'react-redux';
import { TAppState, TAppActions } from '../interfaces/appState';
import Error from '../components/Error';

@connect(state => state, { ...actions })
export default class extends React.Component<{state: TAppState} & TAppActions, {}> {
  componentDidMount() {
    this.props.fetchMenu();
    this.props.setFeedError('something wrong');
  }
  render() {
    return (
      <div className="main-wrapper">
        <Error />
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
