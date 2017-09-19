import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';
import FindMyDogMap from './FindMyDogMap';
import Message from './Message';
import Messages from './Messages';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';

class UpcomingWalkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.convertDate = this.convertDate.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.click = this.click.bind(this);
    this.sendCancelSMS = this.sendCancelSMS.bind(this);
  }

  convertDate(start, end) {
    let jsStart = new Date(start);
    let jsEnd = new Date(end);
    return [moment(jsStart, 'YYY-MM-DD hh:mm:ss').format('llll'), moment(jsEnd, 'YYYY-MM-DD hh:mm:ss').format('LT')];
  }

  handleTouchTap(event) {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  sendCancelSMS(){
    console.log(typeof this.props.walk.owner.phone);
    let time = this.convertDate(this.props.walk.session_start, this.props.walk.session_end);

    $.ajax({
      url: '/api/sms/cancel',
      type: 'POST',
      data: {
        text: 'Your dog walk From ' + time[0]+' to '+time[1] + ' is canceled',
        toOwner: '+1'+this.props.walk.owner.phone,
        toWalker: '+1'+this.props.walk.walker.phone
      },
      success: (res) => {
        console.log('msg sent!')
      },
      error: function(data) {
      }
    })
  }

  click() {
    this.handleTouchTap();
    this.sendCancelSMS();
    setTimeout(()=>this.props.cancelWalk(this.props.walk), 1000);
  }


  render() {
    let time = this.convertDate(this.props.walk.session_start, this.props.walk.session_end);

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleChatClose}
      />,

    ];

    return (

      <Card>
        <CardHeader
          subtitle={`Rating: ${this.props.walk.walker.avg_walker_rating}`}
          avatar={this.props.walk.walker.profile_pic}
          title={this.props.walk.walker.display}
        />

        <div>
          <Link to= {{pathname:'/messages',
                      state: {ownerid: this.props.walk.owner_id,
                              walkerid: this.props.walk.walker_id}
                    }}
          >
          <FlatButton label="Message Walker" primary={true}  style={{'marginLeft': 'px'}}/>
          </Link>
        </div>

        <CardText style={{'font': '14px'}}>
        From {time[0]} to {time[1]}  Near {this.props.walk.walk_zone_pt}
        </CardText>

        <CardTitle subtitle={`$${this.props.walk.price}/hour`}
        />
        <CardActions>
          <RaisedButton label="Cancel This Walk" primary={true} onClick={this.click} />
          <Snackbar
            open={this.state.open}
            message="Walk has been canceled"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </CardActions>


        <RaisedButton label="Message Walker" primary={true} onClick={this.handleMessageLink} style={{'marginLeft': '8px'}}/>

        <Dialog
          title={`Chat with ${this.props.walk.walker.display}`}
          actions={actions}
          modal={false}
          open={this.state.openchat}
          onRequestClose={this.handleChatClose}
        >
          <Message walkerid = {this.props.walk.walker_id} ownerid = {this.props.walk.owner_id}/>
        </Dialog>

        <div><br></br></div>


          <div>
            <Link to= {{pathname:'/messages',
                        state: {ownerid: this.props.walk.owner_id}
                      }}
            >Send Message</Link>
          </div>
        <div>
          <Link to= {{pathname:'/messages',
                      state: {ownerid: this.props.walk.owner_id,
                              walkerid: this.props.walk.walker_id}
                    }}
          >
          <FlatButton label="Message Walker" primary={true}  style={{'marginLeft': 'px'}}/>
          </Link>
        </div>
        <div><br></br></div>
      </Card>

    );
  }
}

export default UpcomingWalkItem;

