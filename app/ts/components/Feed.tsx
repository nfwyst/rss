import * as React from "react";
import { Card, CardTitle, CardActions, Button, CardText } from 'react-mdl';

// Component 属于泛型, 这里不需要 State Props 设置为空对象
// Feed 组件
export default class extends React.Component<{}, {}> {
  render() {
    return (
      <div className="page-content feed-index">
       { /* feed-list 中的每一个 card 表示一个 RSS 项 */ }
        <div className="feed-list">
          <Card shadow={0} style={{ width: "100%", height: "auto", margin: "auto" }}>
            <CardTitle expand style={{ color: "#fff", backgroundColor: "#46B6AC" }}>
              Title
            </CardTitle>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis, mauris quis mollis porta
            </CardText>
            { /* Action 按钮 */ }
            <CardActions border>
              <Button colored>Open</Button>
            </CardActions>
          </Card>
        </div>
        <div className="feed-contents"></div>
      </div>
    );
  }
}
