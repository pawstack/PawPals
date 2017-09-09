import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class ShowPastWalkDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <RaisedButton
          onClick={this.handleTouchTap}
          label="Show Walk Details"
          style={{'marginLeft': '10px'}}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <CardTitle title={`$${this.props.price}/hour`} subtitle={`Start: ${new Date(this.props.start)}, Stop: ${new Date(this.props.stop)}, Near: ${this.props.near}`} />
        </Popover>
      </div>
    );
  }
}

//<CardTitle title={`$${this.props.price}/hour`} subtitle={`Start: ${new Date(this.props.start)}, Stop: ${new Date(this.props.stop)}, Near: ${this.props.near}`} />

