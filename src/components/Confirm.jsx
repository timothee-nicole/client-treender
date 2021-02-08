import React, { Component } from "react";
import { Confirm } from "semantic-ui-react";

class ConfirmPopup extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Confirm
          open={this.state.open}
          onCancel={this.close}
          onConfirm={this.close}
        />
      </div>
    );
  }
}

export default ConfirmPopup;
