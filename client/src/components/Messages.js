import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import ChatWindow from './ChatWindow';
import openSocket from 'socket.io-client';
import Notification  from 'react-web-notification';
import $ from 'jquery';

class ChatList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: null,
      conversationNames: {},
      user_id: null,

      chat: [],
      ignore: true,
      title: ''

      messages: [],
      selectedConversation: [],
    }
    this.fetchMessages = this.fetchMessages.bind(this);
    this.instantiateConversation = this.instantiateConversation.bind(this);
    this.getConversationDetails = this.getConversationDetails.bind(this);
    this.generateConversationNames = this.generateConversationNames.bind(this);
    this.checkNewConversation = this.checkNewConversation.bind(this);
    this.socket = openSocket();
    this.socket.on('new message', (data) => {
      this.handleNewMessage.call(this, data);
    })
  }

  componentWillMount() {

    this.getConversationDetails((conversationDetails) => {
      this.generateConversationNames(conversationDetails, () => {
        this.checkNewConversation(() => {
          this.socket.emit('join', {
            owner: this.state.owner,
            user_id: this.state.user_id,
            names: this.state.conversationNames,
          })
        });
      })
    })
  }

  getConversationDetails(callback) {
    return fetch('/api/messages/senders', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responsejson) => {
        this.setState({owner: responsejson.owner, user_id: responsejson.user_id});
        callback(responsejson);
      })
  }

  generateConversationNames(conversationDetails, callback){
    var conversationNames = {};
    for (var i = 0; i < conversationDetails.details.length; i++) {
      var conversationDetail = conversationDetails.details[i];
      if (this.state.owner) {
        conversationNames[conversationDetail.walker_id] = conversationDetail.walker;
    console.log('owner is',this.props.location.state.ownerid);
    console.log('walker is',this.props.location.state.walkerid);

    this.fetchMessages()
    .then(() => {
      lastConvo = this.state.messages[this.state.messages.length - 1];
      if (lastConvo.owner_id === user_id) {
        var latest_convo_replier_id = lastConvo.walker_id;

      } else {
        conversationNames[conversationDetail.owner_id] = conversationDetail.owner;
      }
    }
    this.setState({conversationNames}, callback);
  }

  checkNewConversation(callback) {
    if (this.props.location.state) {
      if (this.state.owner && !this.state.conversationNames[this.props.location.state.walkerid]) {
        this.instantiateConversation(this.props.location.state.ownerid, this.props.location.state.walkerid, callback);
      } else if (!this.state.owner && !this.state.conversationNames[this.props.location.state.ownerid]) {
        this.instantiateConversation(this.props.location.state.ownerid, this.props.location.state.walkerid, callback);
      } else {
        callback();
      }
    } else {
      callback();
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

  instantiateConversation(owner_id, walker_id, callback) {
    var text = "Woof! Woof! Let's get chatting"
    fetch('/api/messages/write', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        owner_id,
        walker_id,
      })
    })
      .then((response) => response.json())
      .then((responsejson) => {
        var conversationNames = this.state.conversationNames;
        if (this.state.owner) {
          conversationNames[responsejson[0].walker_id] = responsejson[0].walker;
        } else {
          conversationNames[responsejson[0].owner_id] = responsejson[0].owner;
        }
        this.setState({
          conversationNames,
        }, callback)
      })
  }

  fetchMessages(other_person_id) {
    return fetch('/api/messages/fetch',{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        other_person_id,
        owner: this.state.owner,
      })
    })
      .then((response) => response.json())
      .then((responsejson) => {
        this.setState({
          chat: responsejson
        })
      })
  }

  handlePermissionGranted(){
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    this.setState({
      ignore: true
    });
  }

  handleNewMessage(data) {
    if(!this.state.ignore) {
      const title = 'New Message from ' + data.other_person;
      const body = data.message;

      const options = {
        body: body,
        lang: 'en',
      }
      this.setState({
        title: title,
        options: options
      });

    }
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
         {(Object.keys(this.state.conversationNames)).map(key => (
           <ListItem
             primaryText={this.state.conversationNames[key].first + ' ' + this.state.conversationNames[key].last}
             leftAvatar={<Avatar src= {this.state.conversationNames[key].profile_pic} />}
             rightIcon={<CommunicationChatBubble />}
             onClick={() => {this.fetchMessages(key)}}
           />
         ))}
       </List>
       <ChatWindow
         selectedConversation={this.state.chat}
         user_id={this.state.user_id}
         owner={this.state.owner}
         socket={this.socket}
       />
       <Notification
         ignore={this.state.ignore && this.state.title !== ''}
         notSupported={this.handleNotSupported.bind(this)}
         onPermissionGranted={this.handlePermissionGranted.bind(this)}
         onPermissionDenied={this.handlePermissionDenied.bind(this)}
         timeout={5000}
         title={this.state.title}
         options={this.state.options}
       />
     </div>
    );
  }
}

export default ChatList;