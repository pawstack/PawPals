import React from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

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

  handleNewUserMessage(newMessage) {
    addUserMessage(newMessage);
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
