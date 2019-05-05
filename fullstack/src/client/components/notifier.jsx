import React from "react";
import MessageSnackbars from "./messageSnackbars";
import Progress from "./progress";

let openSnackbarFn;
let showProgressFn;
let hideProgressFn;

class Notifier extends React.Component {
  state = {
    open: false,
    message: "",
    variant: "",
    loading: false
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
    showProgressFn = this.showProgress;
    hideProgressFn = this.hideProgress;
  }

  showProgress = () => {
    this.setState({ loading: true });
  };

  hideProgress = () => {
    this.setState({ loading: false });
  };

  openSnackbar = ({ message, variant }) => {
    this.setState({
      open: true,
      message,
      variant
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: ""
    });
  };

  // 3. define a function to close Snackbar when a user clicks away
  render() {
    // 4. show a message to users
    return (
      <div>
        {this.state.loading ? (
          <Progress open />
        ) : (
          <MessageSnackbars
            message={this.state.message}
            open={this.state.open}
            variant={this.state.variant}
            handleClose={this.handleSnackbarClose}
          />
        )}
      </div>
    );
  }
}

export function openSnackbar({ message, variant }) {
  openSnackbarFn({ message, variant });
}

export function showProgress() {
  showProgressFn();
}

export function hideProgress() {
  hideProgressFn();
}

export default Notifier;
