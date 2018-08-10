import * as React from "react";
import { Drawer, Navigation, Icon, FABButton } from 'react-mdl';

// Component 属于泛型, 这里不需要 State Props 设置为空对象
// 侧边栏组件
export default class extends React.Component<{}, {}> {
  render() {
    return (
      <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <Navigation className="mdl-color--blue-grey-80">
          <a>
            <Icon name="autorenew" />Link title
          </a>
        </Navigation>
        <div className="mdl-layout-spacer"></div>
        <div className="tools">
          <FABButton mini>
            <Icon name="add" />
          </FABButton>
          <FABButton mini>
            <Icon name="delete" />
          </FABButton>
          <FABButton mini>
            <Icon name="autorenew" />
          </FABButton>
        </div>
      </Drawer>
    )
  }
}
