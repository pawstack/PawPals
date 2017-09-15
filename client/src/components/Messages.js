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
      conversations: [
        {
          name: 'Nova Qiu',
          url: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
          messages: [
            {
              timestamp: new Date(2017, 2, 1, 1, 10),
              text: 'Hi!'
            },
            {
              timestamp: new Date(2017, 3, 1, 1, 10),
              text: 'Bye!'
            }
          ]
        }
      ],
      selectedChat: {
        name: 'Nova Qiu',
        url: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
        messages: [
          {
            timestamp: new Date(2017, 2, 1, 1, 10),
            text: 'Hi!',
            sender_id: '201'
          },
          {
            timestamp: new Date(2017, 3, 1, 1, 10),
            text: 'Bye!',
            sender_id: '202'
          }
        ]
      },
      user_id: '201'
    }
  }
  render() {
    return (
      <div>
        <List>
          <Subheader>Chats</Subheader>
          {this.state.conversations.map(conversation => (
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
