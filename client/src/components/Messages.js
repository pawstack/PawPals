import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatWindow from './ChatWindow';
import openSocket from 'socket.io-client';

class ChatList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: null,
      conversations: {},
      user_id: null,
      selectedConversation: null,
      chat: [],
    }
    this.fetchMessages = this.fetchMessages.bind(this);
    this.createConversations = this.createConversations.bind(this);
    this.socket = openSocket();
  }

  componentWillMount() {
    this.fetchMessages(() => {
      var roomname = this.state.selectedConversation[0].owner_id.toString() + this.state.selectedConversation[0].walker_id.toString();
      this.socket.emit('join', {roomname})
    })
  }

  createConversations(callback) {
    var conversations = {};
    for (var i = 0; i < this.state.messages.length; i++) {
      var message = this.state.messages[i];
      if (this.state.owner) {
        conversations[message.walker_id] = conversations[message.walker_id] || [];
        conversations[message.walker_id].push(message);
      } else {
        conversations[message.owner_id] = conversations[message.owner_id] || [];
        conversations[message.owner_id].push(message);
      }
    }
    this.setState({conversations, selectedConversation: conversations[Object.keys(conversations)[0]]}, callback)
  }

  fetchMessages(callback) {
   return fetch('/api/messages/fetch',{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responsejson) => {
        this.setState({
          user_id: responsejson.user_id,
          messages: responsejson.messages,
          owner: responsejson.owner,
        },() => {this.createConversations(callback)})
      })
  }

  render() {
    if (this.state.owner) {
      var other_person = 'walker';
    } else {
      var other_person = 'owner';
    }
    return (
      <div>
        <List>
          <Subheader>Chats</Subheader>
          {Object.values(this.state.conversations).map(conversation => (
            <ListItem
              primaryText={conversation[0][other_person].first + ' ' + conversation[0][other_person].last}
              leftAvatar={<Avatar src= {conversation[0][other_person].profile_pic} />}
              rightIcon={<CommunicationChatBubble />}
              value={conversation[0][other_person].id}
              onClick={() => {console.log(conversation)}}
            />
          ))}
        </List>
        <ChatWindow
          selectedConversation={this.state.selectedConversation}
          user_id={this.state.user_id}
          owner={this.state.owner}
          socket={this.socket}
        />
      </div>
    );
  }

}

export default ChatList;
