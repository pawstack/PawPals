import React from 'react';
import ReactDOM from 'react-dom';
import Registration from './components/Registration';

class App extends React.Component {
  render() {
    return (
      <h1>Hello World from React</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
