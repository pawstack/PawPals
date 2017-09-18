import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';
import UpcomingWalkList from './UpcomingWalkList';
import PastWalkList from './PastWalkList';

class WalkHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upcomingwalks: [],
      pastwalks: [],
    };

    this.getUpcomingWalks = this.getUpcomingWalks.bind(this);
    this.cancelWalk = this.cancelWalk.bind(this);

  }

  getUpcomingWalks() {
    $.ajax({
      url: '/api/walkhistory/upcoming',
      type: 'GET',
      success: (res) => {
        // console.log('upcoming WALKS', res);
        this.setState({
          upcomingwalks: res
        });
      },
      error: function(err) {
      }
    });
  }

  cancelWalk(e) {

    // console.log('WALK CANCELED ID ', e.id);
    $.ajax({
      url: '/api/walkhistory/cancel',
      type: 'POST',
      data: {walkID: e.id},
      context: this,
      success: (res) => {
        // console.log('request sent');
        this.getUpcomingWalks();
      },
      error: function(err) {
      }
    });

    // console.log('This walk is canceled');
  }

  getPastWalk() {
    $.ajax({
      url: '/api/walkhistory/past',
      type: 'GET',
      success: (res) => {
        console.log('PAST WALKS', res);
        this.setState({
          pastwalks: res
        });
      },
      error: function(err) {
      }
    });

  }

  componentDidMount() {
    this.getUpcomingWalks();
    this.getPastWalk();
  }

  render() {
    return (
      <div>
        <div>
          <UpcomingWalkList upcomingwalks={this.state.upcomingwalks} cancelWalk={this.cancelWalk} />
        </div>
        <div>
          <br></br>
          <br></br>
        </div>
        <div>
          <PastWalkList pastwalks={this.state.pastwalks}/>
        </div>
      </div>
    );
  }
}

export default WalkHistory;
