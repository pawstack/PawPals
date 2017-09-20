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
    this.updateAverageRating = this.updateAverageRating.bind(this);
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
      context: this,
      success: function(data) {
        this.updateAverageRating();
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

  getRatingDB() {
    $.ajax({
      method: 'GET',
      url: '/api/walks/rating',
      data: {
        ratingFor: this.props.ratingFor,
        walkID: this.props.walk.id
      },
      context: this,
      success: function(data) {
        this.setState({
          starRating: data['rating_' + this.props.ratingFor]
        });
      },
      error: function(err) {
        console.log('error retrieving rating to the db ', err);
      }
    });
  }

  updateAverageRating() {
    $.ajax({
      method: 'POST',
      url: '/api/walks/averagerating',
      data: {
        ratingFor: this.props.ratingFor,
        ratingForID: this.props.ratingForID
      },
      context: this,
      success: function(data) {
      },
      error: function(err) {
        console.log('error updating average rating in DB', err);
      }
    });
  }


  render() {
    return (
      <div style = {{paddingLeft: '2%', paddingBottom: '1%'}}>
        <ReactStars
          count={5}
          size={24}
          onChange = {this.updateRatingDB}
          value = {Number(this.state.starRating)}
          color2={'#ffd700'}
        />
      </div>
    );
  }
}

export default StarRating;
