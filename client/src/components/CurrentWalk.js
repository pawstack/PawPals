import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ShowPastWalkDetails from './ShowPastWalkDetails';
import FindMyDogMap from './FindMyDogMap';
import moment from 'moment';

class CurrentWalk extends React.Component {
  constructor(props) {
    super(props);
    this.convertDate = this.convertDate.bind(this);
  }

  convertDate(start, end) {
    let jsStart = new Date(start);
    let jsEnd = new Date(end);
    return [moment(jsStart, 'YYY-MM-DD hh:mm:ss').format('llll'), moment(jsEnd, 'YYYY-MM-DD hh:mm:ss').format('LT')];
  }

  render() {
    let time = this.convertDate(this.props.walk.session_start, this.props.walk.session_end);    
    return (
      <div>
        <h2>Current Walk</h2>      
        <Card>
          <CardHeader
            subtitle={`Rating: ${this.props.walk.walker.avg_walker_rating}`}
            avatar={this.props.walk.walker.profile_pic}
            title={this.props.walk.walker.display}
          />
          <CardText>
            From {time[0]} to {time[1]}, Near {this.props.walk.walk_zone_pt}
            <FindMyDogMap walkId={this.props.walk.id} />
          </CardText>
          <div>
            <br></br>
          </div>
        </Card>
      </div>
    );
  }
}

export default CurrentWalk;
