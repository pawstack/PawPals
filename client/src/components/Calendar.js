import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import DialogForm from './DialogForm'
import EventDialog from './EventDialog'
  
BigCalendar.momentLocalizer(moment)
require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

class Calendar extends React.Component {
  constructor (props) {
    super(props)
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
    this.handleFormOpen =  this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleEventOpen = this.handleEventOpen.bind(this);
    this.handleEventClose = this.handleEventClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleEventOpen() {
    this.setState({eventOpen: true});
  };

  handleEventClose() {
    this.setState({eventOpen: false});
  };

  handleFormOpen(start, end) {
    this.setState({formOpen: true, start, end});
  }

  handleFormClose() {
    this.setState({formOpen: false});
  }

  handleTextInputChange(key, value) {
    this.setState({key: value}, () => { console.log(this.state.price, 'state price') });
  }

  getEvents(callback) {
    var url = `/api/walkers/fetch?walker_id=${this.state.profile_id}`
    fetch(url, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        var events = [];
        for (var i = 0; i < data.walks.length; i++) {
          var event = {'title': 'walk'};
          event['start'] = new Date(data.walks[i].session_start);
          event['end'] = new Date(data.walks[i].session_end);
          event['price'] = data.walks[i].price;
          event['neighbourhood'] = data.walks[i].walk_zone_pt;
          events.push(event);
        }
        var states = {
          events: events,
          location: data.location
        };
        callback(events);
      })
      .catch((err) => {
        console.log('error:',err)
      })
  }

  handleCancel() {
    console.log('event should cancel')
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/walkers/create', {
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
      .then((events) => {
        this.setState({events, open: false}, () => {console.log(this.state.events, 'events')});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount () {
    this.getEvents((events) => {
      this.setState({events})
    })
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
          onSelectEvent={event => {this.setState({selectedEvent: event, eventOpen: true})}}
          onSelectSlot={(slotInfo) => {
            this.handleFormOpen(slotInfo.start, slotInfo.end);
          }}
        />
        <DialogForm handleTextInputChange={this.handleTextInputChange} open={this.state.formOpen} handleClose={this.handleFormClose} handleOpen={this.handleFormOpen} handleSubmit={this.handleSubmit} start={this.state.start} end={this.state.end} price={this.state.price} location={this.state.location}/>
        < EventDialog handleCancel={this.handleCancel} open={this.state.eventOpen} handleClose={this.handleEventClose} handleOpen={this.handleEventOpen} selectedEvent={this.state.selectedEvent}/>
      </div>
    )
  }
}

export default Calendar;
