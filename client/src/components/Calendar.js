import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import DialogForm from './DialogForm';
import EventDialog from './EventDialog';

BigCalendar.momentLocalizer(moment);
require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css');

let parseEvents = (data) => {
  var events = [];
  for (var i = 0; i < data.walks.length; i++) {
    var event = {};
    if (!!data.walks[i].dog.name) {
      event['title'] = 'Walk with ' + data.walks[i].dog.name;
    } else {
      event['title'] = 'Unbooked Walk';
    }
    event['start'] = new Date(data.walks[i].session_start);
    event['owner_name'] = data.walks[i].owner.first;
    event['owner_phone'] = data.walks[i].owner.phone;
    event['dog_extras'] = data.walks[i].dog.extras;
    event['end'] = new Date(data.walks[i].session_end);
    event['price'] = data.walks[i].price;
    event['pickup_address'] = data.walks[i].pickup_address || data.walks[i].owner.address;
    event['id'] = data.walks[i].id;
    events.push(event);
  }
  return events;
};

class Calendar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      events: [],
      formOpen: false,
      eventOpen: false,
      start: null,
      end: null,
      price: 20,
      location: 'default',
      selectedEvent: {
        walk_zone_pt: null,
        start: null,
        end: null
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleEventOpen = this.handleEventOpen.bind(this);
    this.handleEventClose = this.handleEventClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleEventOpen() {
    this.setState({eventOpen: true});
  }

  handleEventClose() {
    this.setState({eventOpen: false});
  }

  handleFormOpen(start, end) {
    this.setState({formOpen: true, start, end});
  }

  handleFormClose() {
    this.setState({formOpen: false});
  }

  handleTextInputChange(key, value) {
    this.setState({[key]: value});
  }

  getEvents(callback) {
    fetch('/api/walks/fetch', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        var events = parseEvents(data);
        var states = {
          events: events,
          location: data.location
        };
        callback(states);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }

  handleCancel() {
    fetch('/api/walks/destroy', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        'walk_id': this.state.selectedEvent.id
      })
    })
      .then((response) => response.json())
      .then((data) => {
        var events = parseEvents(data);
        this.setState({events, ['eventOpen']: false});
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }

  handleSubmit(e) {
    fetch('/api/walks/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        'session_start': this.state.start,
        'session_end': this.state.end,
        'walk_zone_pt': this.state.location,
        'price': this.state.price,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        var events = parseEvents(data);
        this.setState({events, formOpen: false});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount () {
    this.getEvents((states) => {
      this.setState(states);
    });
  }
  render () {
    return (
      <div>
        <BigCalendar
          selectable
          events={this.state.events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => { this.setState({selectedEvent: event, eventOpen: true}); }}
          onSelectSlot={(slotInfo) => {
            this.handleFormOpen(slotInfo.start, slotInfo.end);
          }}
        />
        <DialogForm handleTextInputChange={this.handleTextInputChange} open={this.state.formOpen} handleClose={this.handleFormClose} handleOpen={this.handleFormOpen} handleSubmit={this.handleSubmit} start={this.state.start} end={this.state.end} price={this.state.price} location={this.state.location}/>
        < EventDialog handleCancel={this.handleCancel} open={this.state.eventOpen} handleClose={this.handleEventClose} handleOpen={this.handleEventOpen} selectedEvent={this.state.selectedEvent}/>
      </div>
    );
  }
}

export default Calendar;
