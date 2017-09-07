import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class SnackbarSimple extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>
    );
  }
}
