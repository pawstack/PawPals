import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatWindow from './ChatWindow';

class ChatList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: null,
      conversations: {},
      user_id: null,
      messages: [],
      selectedConversation: [],
    }
    this.fetchMessages = this.fetchMessages.bind(this);
  }

  componentWillMount() {
    console.log('owner is',this.props.location.state.ownerid);
    console.log('walker is',this.props.location.state.walkerid);

    this.fetchMessages()
    .then(() => {
      lastConvo = this.state.messages[this.state.messages.length - 1];
      if (lastConvo.owner_id === user_id) {
        var latest_convo_replier_id = lastConvo.walker_id;
      } else {
        var latest_convo_replier_id = lastConvo.user_id;
      }
      this.createConversation(latest_convo_replier_id);
    })
  }

  createConversations() {
    // var conversation = [];
    // for (var i = 0; i < this.state.messages.length; i++) {
    //   var message = this.state.messages[i];
    //   if (message.owner_id === replier_id || message.walker_id === replier_id) {
    //     conversation.push(message);
    //   }
    // }
    // this.setState({conversation});
  }

  fetchMessages() {
   return fetch('/api/messages/fetch', {
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
        })
      })
  }

  render() {
    return (
      <div>
        <List>
          <Subheader>Chats</Subheader>
          {this.state.messages.map(messages => (
            <ListItem
              primaryText={conversation.name}
              leftAvatar={<Avatar src= {conversation.url} />}
              rightIcon={<CommunicationChatBubble />}
              onClick={() => {console.log('hello')}}
            />
          ))}
        </List>
        <ChatWindow selectedChat={this.state.selectedChat} user_id={this.state.user_id} />
      </div>
    );
  }

}

export default ChatList;
