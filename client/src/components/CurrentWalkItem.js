import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class CurrentWalkItem extends React.Component {
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
        <CardTitle title={`$${this.props.walk.price}/hour`} subtitle={`Start: ${new Date(this.props.walk.session_start)}, Stop: ${new Date(this.props.walk.session_end)}, Near: ${this.props.walk.walk_zone_pt}`}
        />
        <CardActions>
          <RaisedButton label="Cancel This Walk" primary={true} onClick={() => this.props.cancelWalk(this.props.walk)} />
        </CardActions>
        <div><br></br></div>
      </Card>

    );
  }
}

export default CurrentWalkItem;

//<CardText>{this.props.walk.walker.about_me}</CardText>


