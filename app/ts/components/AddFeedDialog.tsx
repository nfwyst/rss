import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Textfield
} from "react-mdl";
import * as React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actions';

@connect(state => state, {...actions})
export default class extends React.Component<any, {}> {
  private urlEl: Textfield;
  private formEl: HTMLFormElement;
  private onSubmit = (e: React.MouseEvent<HTMLFormElement>) =>  {
    const urlEl = this.urlEl as any;
    e.preventDefault();
    this.save(urlEl.inputRef.value);
    this.close();
  }
  async save(url: string) {
    const { addFeed, fetchMenu, setActiveFeed } = this.props;
    let items = await addFeed(url);
    await fetchMenu(items.payload.length - 1);
    await setActiveFeed(items.payload.slice(-1)[0].url);
    if (!this.props.state.feedError) {
      this.formEl.reset();
    }
  }
  private close = () => {
    this.props.toggleOpenAddFeed(false);
    this.formEl.reset();
  }

  render() {
    const { isOpenAddFeed } = this.props.state;
    return (<div>
        <Dialog open={isOpenAddFeed}>
          <DialogTitle>添加 Feed</DialogTitle>
          <DialogContent>
          <form onSubmit={this.onSubmit} ref={(el: HTMLFormElement) => { this.formEl = el; }}>
            <Textfield
              label="URL"
              required
              floatingLabel
              ref={(el: Textfield) => { this.urlEl = el; }}
            />
          </form>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={this.onSubmit}>
              保存
            </Button>
            <Button type="button" onClick={this.close}>
              取消
            </Button>
          </DialogActions>
        </Dialog>
    </div>);
  }

}
