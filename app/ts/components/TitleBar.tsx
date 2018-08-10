import * as React from 'react';
import { remote } from 'electron';
import { Header, Navigation, Icon } from 'react-mdl';

// Component 属于泛型, 这里不需要 State Props 设置为空对象
// 头部组件
export default class TitleBar extends React.Component<{}, {}> {
  // 私有方法, 对关闭窗口进行响应
  private onClose = () => {
    remote.getCurrentWindow().close();
  }
  render() {
  return (<Header scroll>
      <Navigation>
        <a href="#" onClick={this.onClose}><Icon name="close"/></a>
      </Navigation>
    </Header>);
  }
}
