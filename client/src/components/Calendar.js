import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import BigCalendar from 'react-big-calendar'
// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment)
require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }
  componentDidMount () {
    this.getEvents((events) => {
      this.setState({events})
    })
  }
  render () {
    return (
        <BigCalendar
          selectable
          events={this.state.events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => console.log(event)}
          onSelectSlot={(slotInfo) => console.log(slotInfo)}
        />
    )
  }

  getEvents(callback) {
  	const CALENDAR_ID = 'young.lu1995@gmail.com';
  	const SECRET = 'Emwvwj5SZ67_NIc6';
  	fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`)
  	.then((response) => {response.json()})
  	.then((responseJson) => console.log(responseJson));
  }
}

export default Calendar;