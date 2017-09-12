import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactStars from 'react-stars';


class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: 0
    };
    
    this.updateRatingDB = this.updateRatingDB.bind(this);
    this.getRatingDB = this.getRatingDB.bind(this);
  }

  updateRatingDB (event) {
    $.ajax({
      method: 'POST',
      url: '/api/walks/rating',
      data: {
        rating: event,
        ratingFor: this.props.ratingFor,
        walkID: this.props.walk.id
      },
      success: function(data) {
        console.log('successfully updated rating to the db ', data);
        this.getRatingDB();
      },
      error: function(err) {
        console.log('error updating rating to the db ', err);
      }
    });
  }

  componentDidMount() {
    this.getRatingDB();
  }

  getRatingDB () {
    console.log('about to get rating from db');
    $.ajax({
      method: 'GET',
      url: '/api/walks/rating',
      data: {
        ratingFor: this.props.ratingFor,
        walkID: this.props.walk.id
      },
      context: this,
      success: function(data) {
        console.log('**successfully retrieved rating from db ', data);
        this.setState({
          starRating: data['rating_' + this.props.ratingFor]
        });
      },
      error: function(err) {
        console.log('error retrieving rating to the db ', err);
      }
    });
  }

  render() {
    return (
      <div>

        <ReactStars
          count={5}
          size={24}
          onChange = {this.updateRatingDB}
          value = {this.state.starRating}
          color2={'#ffd700'}
        />
      </div>
    );
  }
}

export default StarRating;
