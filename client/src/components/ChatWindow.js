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
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.props.socket.on('new message', (data)=>{
      addResponseMessage(data.message);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedConversation !== nextProps.selectedConversation) {
      this.createConversation(nextProps);
    }
  }

  handleNewUserMessage(message) {
    var roomname = this.props.selectedConversation[0].owner_id.toString() + this.props.selectedConversation[0].walker_id.toString();
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
        this.props.socket.emit('new message', {roomname, message})
      })
  }

  createConversation(nextProps) {
    for (var i = 0; i < nextProps.selectedConversation.length; i++) {
      var message = nextProps.selectedConversation[i];
      if (message.sender_id === nextProps.user_id) {
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
    if (this.props.selectedConversation && this.props.selectedConversation.length > 0) {
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
    }
    else{
      return(<div></div>)
    }
  }
}
export default ChatWindow;
