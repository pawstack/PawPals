import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class BrowseListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.walk.walker.display}
          subtitle={`Rating: ${this.props.walk.walker.avg_walker_rating}`}
          avatar={this.props.walk.walker.profile_pic}
        />
        <CardTitle title={`$${this.props.walk.price}/hour`} subtitle={`Start: ${new Date(this.props.walk.session_start)}, Stop: ${new Date(this.props.walk.session_end)}, Near: ${this.props.walk.walk_zone_pt}`} />
        <CardText>
          {this.props.walk.walker.about_me}
        </CardText>
        <CardActions>
          <RaisedButton label="Proceed to Checkout" primary={true} onClick={() => this.props.selectWalk(this.props.walk)} />
        </CardActions>
      </Card>
    );
  }
}

export default BrowseListItem;
