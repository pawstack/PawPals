import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ShowPastWalkDetails from './ShowPastWalkDetails';
import FindMyDogMap from './FindMyDogMap';
import StarRating from './StarRating.jsx';
import StaticPastWalkMap from './StaticPastWalkMap.jsx';

class PastWalkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false
    };
    this.updateAnimateState = this.updateAnimateState.bind(this);
  }

  updateAnimateState() {
    this.setState({
      animate: !this.state.animate
    });
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
          {
            this.state.animate ?
              <FindMyDogMap walkId={this.props.walk.id} updateAnimateState = {this.updateAnimateState}/> :
              <StaticPastWalkMap walkId = {this.props.walk.id} updateAnimateState = {this.updateAnimateState}/>
          }
        </CardText>
        <CardText>
          <div style = {{display: 'inline-block', float: 'left', paddingRight: '10px', paddingTop: '6px', fontSize: '15px'}}>
            Rate this walk with {this.props.walk.walker.first}:
          </div>
          <StarRating
            ratingFor = {'walker'}
            walk= {this.props.walk}
            ratingForID = {this.props.walk['walker_id']}
            style = {{display: 'inline-block', float: 'left', paddingLeft: '6px'}}
          />
        </CardText>
        <ShowPastWalkDetails
          price={this.props.walk.price}
          start={this.props.walk.session_start}
          stop ={this.props.walk.session_end}
          near={this.props.walk.walk_zone_pt}/>
        <div>
          <br></br>
        </div>
      </Card>
    );
  }
}

export default PastWalkItem;
