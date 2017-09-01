import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import SignUpStart from './components/SignUpStart';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to='/signup/start'>Signup</Link></li>
          </ul>
          <Route exact path="/home" render={() => (
            <h1>Hello World from React</h1>
          )}/>
          <Route exact path="/signup/start" component={SignUpStart}/>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
