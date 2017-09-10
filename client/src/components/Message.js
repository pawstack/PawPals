import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import openSocket from 'socket.io-client';


class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message:'',
      display:[]

    }
    this.socket = openSocket();
    this.sendMessage = this.sendMessage.bind(this);
    this.messageInput = this.messageInput.bind(this);

    this.socket.on('message', (data)=>{

      var newdisplay = this.state.display;
      newdisplay.push(data);
      this.setState({
        display: newdisplay
      },
        function(){console.log('Display,',this.state.display)
      })
    })
  };



  componentDidMount(){
    this.socket.join('room1');
  }

  sendMessage() {
    this.socket.emit('startChat', this.state.message);
  }


  messageInput(e){
    this.setState({
      message: e.target.value
    })

  }

  render(){
    return(
      <div>
      <div>{this.state.display.map((msg,index)=>{return <div key={index}>{msg}</div>})}</div>
      <input type="text" onChange={this.messageInput}></input>
      <button onClick={this.sendMessage}>
        Send!
      </button>
      </div>
    )
  }
}

export default Message;




