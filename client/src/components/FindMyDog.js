import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FindMyDogMap from './FindMyDogMap';
import CenteredCircularProgress from './CenteredCircularProgress';
import $ from 'jquery';
import moment from 'moment';
import {Link} from 'react-router-dom';

class FindMyDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walk: null
    };
    this.getCurrentWalk = this.getCurrentWalk.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  componentDidMount() {
    this.getCurrentWalk();
  }

  getCurrentWalk() {
    $.ajax({
      url: '/api/walkhistory/current',
      type: 'GET',
      success: (walk) => {
        walk = walk ? walk : {};
        this.setState({
          walk: walk
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  convertDate(start, end) {
    let jsStart = new Date(start);
    let jsEnd = new Date(end);
    return [moment(jsStart, 'YYY-MM-DD hh:mm:ss').format('llll'), moment(jsEnd, 'YYYY-MM-DD hh:mm:ss').format('LT')];
  }

  render() {
    if (!this.state.walk) {
      return <CenteredCircularProgress />;
    } else if (!this.state.walk.id) {
      return <p>No active walk at this time. <Link to="/browse" >Browse for walks here!</Link></p>;
    } else {
      let time = this.convertDate(this.state.walk.session_start, this.state.walk.session_end);
      return (
        <div>
          <h2>Find My Dog</h2>
          <Card>
            <CardHeader
              subtitle={`Rating: ${this.state.walk.walker.avg_walker_rating}`}
              avatar={this.state.walk.walker.profile_pic}
              title={this.state.walk.walker.display}
            />
            <CardText>
              <p>Walk happening around {this.state.walk.walk_zone_pt}</p>
              <p>From {time[0]} to {time[1]}, Near {this.state.walk.walk_zone_pt}</p>
              <p>Call {this.state.walk.walker.first}: {this.state.walk.walker.phone}</p>
              <FindMyDogMap walkId={this.state.walk.id} walk = {this.state.walk}/>
            </CardText>
          </Card>
        </div>
      );
    }
  }
}

export default FindMyDog;
