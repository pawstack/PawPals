import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactStars from 'react-stars';


class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: 0
    };
    this.chooseRating = this.chooseRating.bind(this);
  }

  chooseRating (event) {
    console.log('the rating is ', event);
    this.setState({
      starRating: event
    });
  }

  render() {
    return (
      <div>

        <ReactStars
          count={5}
          size={24}
          onChange = {this.chooseRating}
          value = {this.state.starRating}
          color2={'#ffd700'}
        />
      </div>
    );
  }
}

export default StarRating;
