import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "react-mdl";
import { connect } from 'react-redux';
import actions from '../actions/actions';

// state 由 connect map to props
@connect(state => state, { setFeedError: actions.setFeedError })
export default class extends React.Component<any, {}> {
  private onClose = () => {
    this.props.setFeedError("");
  };

  render() {
    const { feedError } = this.props.state;
    return (
      <Dialog open={Boolean(feedError)}>
        <DialogTitle>出错了</DialogTitle>
        <DialogContent>
          <p>{feedError}</p>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={this.onClose}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
