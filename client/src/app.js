import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SignUp from './components/SignUp';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </ul>
        
        <Route exact path="/" render={() => (
          <h1>Hello World from React</h1>
        )}/>
        <Route path="/signup" component={SignUp}/>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
