import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import openSocket from 'socket.io-client';
import FlatButton from 'material-ui/FlatButton';


class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      display: [],
      align: null
    };

    this.socket = openSocket();
    this.sendMessage = this.sendMessage.bind(this);
    this.messageInput = this.messageInput.bind(this);

    this.socket.on('message', (data)=>{

      var newdisplay = this.state.display;
      newdisplay.push(data);

      this.setState({
        display: newdisplay
      }
      );
    });

  }


  fetchMessages() {
    fetch('/api/messages/fetch', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }

  componentDidMount() {

  }

  saveMessages() {
    $.ajax({
      url: '/api/messages/save',
      type: 'POST',
      data: {
        text: this.state.message,
        walker_id: this.props.walkerid,
        owner_id: this.props.ownerid
      },
      success: (res) => {

      },
      error: function(data) {
      }
    });
  }

  sendMessage() {
    var room = this.props.ownerid.toString() + this.props.walkerid.toString();
    this.socket.emit('startChat', { message: this.state.message,
      room: room
    });
  }

  messageInput(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div>{this.state.display.map((msg, index)=>{ return <div key={index}>{msg}</div>; })}</div>
        <input type="text" onChange={this.messageInput}></input>
        <FlatButton
          label="Send"
          primary={true}
          onClick={this.sendMessage}
        />

      </div>
    );
  }
}

export default Message;




