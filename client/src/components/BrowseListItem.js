import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class BrowseListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // {this.props.walk.walkzonePt}

  // walks: [{
  //   id: 1,
  //   ownerId: 1,
  //   walkerId: 2,
  //   dogId: 1,
  //   walkzonePt: '944 Market St, San Francisco, CA 94102',
  //   pickupAddress: '1655 Mission St, San Francisco, CA, 94103',
  //   walkzoneRadius: 3,
  //   price: 40
  // }]

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.walk.walkerName}
          subtitle="Subtitle"
          avatar={this.props.walk.walkerProfilePic}
        />
        <CardTitle title={`$${this.props.walk.price}/hour`} subtitle={`Near ${this.props.walk.walkzonePt}`} />
        <CardText>
          About me
        </CardText>
        <CardActions>
          <FlatButton label="Book this walk" />
        </CardActions>
      </Card>
    );
  }
}

export default BrowseListItem;
