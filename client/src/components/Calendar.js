import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import DialogForm from './DialogForm'

BigCalendar.momentLocalizer(moment)
require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: [],
      open: false,
      start: null,
      end: null,
      price: 20,
      location: 'default'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  handleOpen(start, end) {
    this.setState({open: true, start, end});
  }

  handleClose() {
    this.setState({open: false});
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
        for (var i = 0; i < data.length; i++) {
          var event = {'title': 'walk'};
          event['start'] = new Date(data[i].session_start);
          event['end'] = new Date(data[i].session_end);
          event['price'] = data[i].price;
          event['neighbourhood'] = data[i].walk_zone_pt;
          events.push(event);
        }
        callback(events);
      })
      .catch((err) => {
        console.log('error:',err)
      })
  }

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
        <DialogForm handleTextInputChange={this.handleTextInputChange} profile_id={this.state.profile_id} open={this.state.open} handleClose={this.handleClose} handleOpen={this.handleOpen} handleSubmit={this.handleSubmit} start={this.state.start} end={this.state.end} price={this.state.price} location={this.state.location}/>
        <BigCalendar
          selectable
          events={this.state.events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => console.log(event)}
          onSelectSlot={(slotInfo) => {
            this.handleOpen(slotInfo.start, slotInfo.end);
          }}
        />
      </div>
    )
  }
}

export default Calendar;
