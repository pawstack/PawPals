import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import moment from 'moment';
import '../../../public/componentCSS/show_past_walk_details.css';

export default class ShowPastWalkDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  convertDate(start, end) {
    let jsStart = new Date(start);
    let jsEnd = new Date(end);
    return [moment(jsStart, 'YYY-MM-DD hh:mm:ss').format('llll'), moment(jsEnd, 'YYYY-MM-DD hh:mm:ss').format('LT')];
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
    let time = this.convertDate(this.props.start, this.props.stop);
    return (
      <div>
        <RaisedButton
          onClick={this.handleTouchTap}
          label="Show Walk Details"
          className="show-details-btn"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <CardText>
            From {time[0]} to {time[1]}
            <br></br>
            Near {this.props.near}
            <br></br>
            ${this.props.price}/hour
          </CardText>

        </Popover>
      </div>
    );
  }
}

//<CardTitle title={`$${this.props.price}/hour`} subtitle={`Start: ${new Date(this.props.start)}, Stop: ${new Date(this.props.stop)}, Near: ${this.props.near}`} />
