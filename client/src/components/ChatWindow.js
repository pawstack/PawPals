import React from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import $ from 'jquery';

const widgetStyles = {
  header: {
    backgroundColor: '#66BB6A'
  },
  launcher: {
    backgroundColor: '#66BB6A',
  },
  message: {
    backgroundColor: '#C8E6C9'
  },
  snippet: {
    info: {
      borderLeft: '2px solid #66BB6A'

const widgetStyles = {
  header: {
    backgroundColor: '#334588'
  },
  launcher: {
    backgroundColor: '#334588'
  },
  message: {
    backgroundColor: '#cdd8ec'
  },
  snippet: {
    info: {
      borderLeft: '2px solid #cdd8ec'
    }
  }
}

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.props.socket.on('new message', (data) => {
      if (data.own_id === this.props.selectedConversation[0].walker_id || data.own_id === this.props.selectedConversation[0].owner_id) {
        addResponseMessage(data.message);
      }
    })
    $(document).on("click",".launcher",function(e){
      $('.launcher').hide();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.selectedConversation) !== JSON.stringify(nextProps.selectedConversation)) {
      this.createConversation(nextProps);
    }
  }

  componentDidUpdate() {
    if ($('img').hasClass('close-launcher')){
      $('.launcher').hide();
    }
  }

  handleNewUserMessage(message) {
    var roomname = this.props.selectedConversation[0].owner_id.toString() + this.props.selectedConversation[0].walker_id.toString();
    if (this.props.owner) {
      var other_person = this.props.selectedConversation[0].walker.first;
      var own_id = this.props.selectedConversation[0].owner_id;
    } else {
      var other_person = this.props.selectedConversation[0].owner.first;
      var own_id = this.props.selectedConversation[0].walker_id;
    }
    fetch('/api/messages/write', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        owner_id: this.props.selectedConversation[0].owner_id,
        walker_id: this.props.selectedConversation[0].walker_id,
      })
    })
      .then(() => {
        this.props.socket.emit('new message', {roomname, message, other_person, own_id})
      })
  }

  createConversation(nextProps) {
    $('.message').remove();
    for (var i = 0; i < nextProps.selectedConversation.length; i++) {
      var message = nextProps.selectedConversation[i];
      if (message.sender_id === nextProps.user_id) {

    }
  }
  componentDidMount() {
    console.log(this.props.selectedChat);
    for (var i = 0; i < this.props.selectedChat.messages.length; i++) {
      var message = this.props.selectedChat.messages[i];
      if (message.sender_id !== this.props.user_id) {
        addUserMessage(message.text);
      } else {
        addResponseMessage(message.text);
      }
    }
  }

  render() {
    if (this.props.owner) {
      var other_person = 'walker';
    } else {
      var other_person = 'owner';
    }
    if (this.props.selectedConversation && this.props.selectedConversation.length > 0){
      return (
        <div className="App">
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            stylesInjected={widgetStyles}
            profileAvatar={this.props.selectedConversation[0][other_person].profile_pic}
            title= {"Chat with " + this.props.selectedConversation[0][other_person].first}
            subtitle=''
          />
        </div>
      );
    } else {
      $('.message').remove();
      return (
        <div className="App">
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            stylesInjected={widgetStyles}
            profileAvatar={null}
            title= {"Pick a conversation to start chatting!"}
            subtitle=''
          />
        </div>
      );
    }
  }
}
  handleNewUserMessage(newMessage) {
    addUserMessage(newMessage);

    // send web socket connection

    fetch('/api/messages/write', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: newMessage,
      })
    })

  }


  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          stylesInjected={widgetStyles}
          profileAvatar='https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg'
          title= {"Chat with " + this.props.selectedChat.name}
          subtitle=''
        />
      </div>
    );
  }
}

export default ChatWindow;
