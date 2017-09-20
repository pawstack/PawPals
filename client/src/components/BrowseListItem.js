import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

class BrowseListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.convertDate = this.convertDate.bind(this);
  }

  convertDate(start, end) {
    let jsStart = new Date(start);
    let jsEnd = new Date(end);
    return [moment(jsStart, 'YYY-MM-DD hh:mm:ss').format('llll'), moment(jsEnd, 'YYYY-MM-DD hh:mm:ss').format('LT')];
  }

  componentDidMount() {
  }

  render() {
    if (this.props.start_owner && this.props.end_owner) {
      var time = this.convertDate(this.props.start_owner, this.props.end_owner);
    }
    return (
      <Card>
        <CardHeader
          title={this.props.walk.walker.display}
          subtitle={`Rating: ${this.props.walk.walker.avg_walker_rating}`}
          avatar={this.props.walk.walker.profile_pic}
        />
        <CardTitle title={`$${this.props.walk.price}/hour`} subtitle={`From ${time[0]} to ${time[1]}, Near: ${this.props.walk.walk_zone_pt}`} />
        <CardText>
          {this.props.walk.walker.about_me}
        </CardText>
        <CardActions>
          <RaisedButton
            label="Proceed to Checkout"
            primary={true}
            onClick={() => this.props.selectWalk(this.props.walk, this.props.index)}
          />
        </CardActions>
      </Card>
    );
  }
}



export default BrowseListItem;
