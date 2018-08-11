import * as React from "react";
import { Drawer, Navigation, Icon, FABButton } from 'react-mdl';
import AddFeedDialog from './AddFeedDialog';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import { MenuItem } from '../interfaces/menu';
import { menu } from '../actions/actions';
// 侧边栏组件
@connect(state => state, {...actions})
class Menu extends React.Component<any, {}> {
  static getClassName = (toggle: boolean) => {
    const classList = ['mdl-navigation-link'];
    return toggle ? classList.concat('mdl-navigation-link-cur').join(' ') : classList.join('');
  }
  private onAdd = () => {
    this.props.toggleOpenAddFeed(true);
  }
  private onRemove = () => {
    const { setActiveFeed, fetchMenu,  removeFeed, state } = this.props;
    menu.remove(state.activeFeedUrl);
    removeFeed(state.activeFeedUrl);
    fetchMenu(0);
    setActiveFeed(menu.items[0].url);
  }
  private onRefresh = () => {
    this.props.fetchMenu(menu.items.findIndex(item => this.props.state.activeFeedUrl === item.url));
  }
  private handleSwitch = (i) => {
    this.props.fetchMenu(i);
    this.props.setActiveFeed(menu.items[i].url);
  }
  render() {
    const { state } = this.props;
    const menu = state.menu || [];
    return (
      <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <AddFeedDialog />
        <Navigation className="mdl-color--blue-grey-80">
          { menu.map((item: MenuItem, index: number) => {
            return (<a key={item.id} href={`#${item.id}`} onClick={() => this.handleSwitch(index)} className={Menu.getClassName(item.url ===  state.activeFeedUrl)}>
              <Icon name="autorenew" />
              {item.title}
            </a>)
          }) }
        </Navigation>
        <div className="mdl-layout-spacer"></div>
        <div className="tools">
          <FABButton mini onClick={this.onAdd}>
            <Icon name="add" />
          </FABButton>
          <FABButton mini onClick={this.onRemove}>
            <Icon name="delete" />
          </FABButton>
          <FABButton mini onClick={this.onRefresh}>
            <Icon name="autorenew" />
          </FABButton>
        </div>
      </Drawer>
    )
  }
}

export default Menu;
