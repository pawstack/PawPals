import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';
import CurrentWalkList from './CurrentWalkList';
import PastWalkList from './PastWalkList';


class WalkHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentwalks: [],
      pastwalks: []
    };

  }

  getCurrentWalk() {
    $.ajax({
      url: '/api/walkhistory/current',
      type: 'GET',
      success: (res) => {
        console.log('CURRENT WALKS', res);
        this.setState({
          currentwalks: res
        });
      },
      error: function(err) {
      }
    });
  }

  cancelWalk() {
    console.log('This walk is canceled');
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
    this.getCurrentWalk();
    this.getPastWalk();
  }


  render() {

    return (
      <div>
        <div>
          <CurrentWalkList currentwalks={this.state.currentwalks} cancelWalk={this.cancelWalk} />
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