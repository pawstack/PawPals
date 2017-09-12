import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';
import FindMyDogMap from './FindMyDogMap';

class UpcomingWalkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.convertDate = this.convertDate.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.click = this.click.bind(this);

  }

  convertDate(start, end) {
    let jsStart = new Date(start);
    let jsEnd = new Date(end);
    return [moment(jsStart, 'YYY-MM-DD hh:mm:ss').format('llll'), moment(jsEnd, 'YYYY-MM-DD hh:mm:ss').format('LT')];
  }

  handleTouchTap(event) {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  click() {
    this.handleTouchTap();
    setTimeout(()=>this.props.cancelWalk(this.props.walk), 1000);
  }

  render() {
    let time = this.convertDate(this.props.walk.session_start, this.props.walk.session_end);
    return (
      <Card>
        <CardHeader
          subtitle={`Rating: ${this.props.walk.walker.avg_walker_rating}`}
          avatar={this.props.walk.walker.profile_pic}
          title={this.props.walk.walker.display}
        />
        <CardText style={{'font': '14px'}}>
        From {time[0]} to {time[1]}  Near {this.props.walk.walk_zone_pt}
        </CardText>

        <CardTitle subtitle={`$${this.props.walk.price}/hour`}
        />
        <CardActions>
          <RaisedButton label="Cancel This Walk" primary={true} onClick={this.click} />
          <Snackbar
            open={this.state.open}
            message="Walk has been canceled"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </CardActions>
        <div><br></br></div>
      </Card>

    );
  }
}

export default UpcomingWalkItem;

//<CardText>{this.props.walk.walker.about_me}</CardText>


