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
          title={this.props.walk.walkerName}
          subtitle="Subtitle"
          avatar={this.props.walk.walkerProfilePic}
        />
        <CardTitle title={`$${this.props.walk.price}/hour`} subtitle={`Near ${this.props.walk.walk_zone_pt}`} />
        <CardText>
          About me
        </CardText>
        <CardActions>
          <RaisedButton label="Book this walk" primary={true} />
        </CardActions>
      </Card>
    );
  }
}

export default BrowseListItem;
