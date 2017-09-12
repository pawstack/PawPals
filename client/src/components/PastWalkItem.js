import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ShowPastWalkDetails from './ShowPastWalkDetails';
import FindMyDogMap from './FindMyDogMap';
import StarRating from './StarRating.jsx';

class PastWalkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Card>
        <CardHeader
          subtitle={`Rating: ${this.props.walk.walker.avg_walker_rating}`}
          avatar={this.props.walk.walker.profile_pic}
          title={this.props.walk.walker.display}
        />
        <CardText>
          <FindMyDogMap walkId={this.props.walk.id} />
        </CardText>
        <div>
          <br></br>
          <br></br>
        </div>
        <ShowPastWalkDetails
          price={this.props.walk.price}
          start={this.props.walk.session_start}
          stop ={this.props.walk.session_end}
          near={this.props.walk.walk_zone_pt}/>
        <StarRating
          ratingFor = {'walker'}
          walk= {this.props.walk}
          ratingForID = {this.props.walk['walker_id']}
        />
        <div>
          <br></br>
        </div>
      </Card>
    );
  }
}

export default PastWalkItem;
