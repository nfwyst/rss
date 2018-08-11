import * as React from "react";
import { Card, CardTitle, CardActions, Button, CardText } from 'react-mdl';
import { shell } from 'electron';
import { RssItem } from "../interfaces/rss";
import { connect } from 'react-redux';
// Component 属于泛型, 这里不需要 State Props 设置为空对象
// Feed 组件
@connect(state => state, null)
export default class Feed extends React.Component<any, {}> {
  private indexEl: HTMLElement;
  private contentsEl: HTMLElement;
  private webviewEl: Electron.WebviewTag;
  // 将 HTML 转换为 text
  static converHTML(html: string) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
  private onOpenLink= (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.target as HTMLElement;
    const url = btn.dataset.link;
    e.preventDefault();
    this.indexEl.classList.add('is-open');
    this.webviewEl.src = url;
  }
  private onCloseLink = () => {
    this.indexEl.classList.remove('is-open');
    this.webviewEl.src = 'blank';
  }
  componentDidMount() {
    this.webviewEl = this.contentsEl.firstChild as Electron.WebviewTag;
    this.webviewEl.addEventListener('new-window', (e) => {
      e.preventDefault();
      shell.openExternal( e.url );
    });
  }
  render() {
    const { items } = this.props.state;
    return (
      <div className="page-content feed-index" ref={(el: HTMLElement) => {
        this.indexEl = el;
      }}>
       { /* feed-list 中的每一个 card 表示一个 RSS 项 */ }
        <div className="feed-list">
        {
          items.map((item: RssItem, id: number) => {
            return (
              <Card key={id} shadow={0} style={{ width: "100%", height: "auto", margin: "auto" }}>
                <CardTitle expand style={{ color: "#fff", backgroundColor: "#46B6AC" }}>
                  {item.title}
                </CardTitle>
                <CardText onClick={this.onCloseLink}>
                  {item.description ? Feed.converHTML(item.description) : ''}
                </CardText>
                { /* Action 按钮 */ }
                <CardActions border>
                  <Button colored data-link={item.link} onClick={this.onOpenLink}>Open</Button>
                </CardActions>
              </Card>
            )
          })
        }
        </div>
        <div
          className="feed-contents"
          ref={(el: HTMLElement) => {this.contentsEl = el;}}
          dangerouslySetInnerHTML={{
            __html: `<webview class="feed-contents-src"></webview>`
          }}
        >
        </div>
      </div>
    );
  }
}
