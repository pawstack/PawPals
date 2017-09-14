import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import DialogForm from './DialogForm';
import EventDialog from './EventDialog';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import SnackBarCom from './SnackBar';

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
    event['start'] = new Date(data.walks[i].session_start_walker);
    event['paid'] = data.walks[i].paid;
    event['owner_name'] = data.walks[i].owner.first;
    event['dog_id'] = data.walks[i].dog.id;
    event['owner_phone'] = data.walks[i].owner.phone;
    event['dog_profile_pic'] = data.walks[i].dog.profile_pic;
    event['dog_extras'] = data.walks[i].dog.extras;
    event['end'] = new Date(data.walks[i].session_end_walker);
    event['price'] = data.walks[i].price;
    event['pickup_address'] = data.walks[i].pickup_address || data.walks[i].owner.address;
    event['id'] = data.walks[i].id;
    event['dog_avg_rating'] = data.walks[i].dog.avg_rating;
    event['dog_name'] = data.walks[i].dog.name;
    event['owner_id'] = data.walks[i].owner_id;
    event['walker_id'] = data.walks[i].walker_id;
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
      snackBarOpen: false,
      start: null,
      end: null,
      price: 20,
      location: 'default',
      selectedEvent: {
        walk_zone_pt: null,
        start: null,
        end: null
      },
      tracking: {
        geolocations: [],
        maximumAge: 30000,
        timeout: 10000,
        enableHighAccuracy: true,
        watchId: null
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleEventOpen = this.handleEventOpen.bind(this);
    this.handleEventClose = this.handleEventClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.requestRefundForCancellation = this.requestRefundForCancellation.bind(this);
    this.handleStartWalk = this.handleStartWalk.bind(this);
    this.handleFinishWalk = this.handleFinishWalk.bind(this);
    this.processGeoResult = this.processGeoResult.bind(this);
    this.startWatch = this.startWatch.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.handleGeoError = this.handleGeoError.bind(this);
    this.postGeolocation = this.postGeolocation.bind(this);
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

  handleSnackBarClose() {
    this.setState({
      snackBarOpen: false,
    });
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
    if (this.state.selectedEvent.paid) {
      this.requestRefundForCancellation(this.state.selectedEvent.id);
    }
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

  requestRefundForCancellation(walk_id) {
    fetch('api/walks/refund', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({walkID: walk_id})
    })
      .then(() => {
        this.setState({['snackBarOpen']: true});
      })
      .catch((err) => {
        console.log('refund failed');
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    geocodeByAddress(this.state.location)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
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
            'longitude': latLng['lng'],
            'latitude': latLng['lat']
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            var events = parseEvents(data);
            this.setState({events, formOpen: false}, () => {
              console.log(this.state.events)
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  componentDidMount () {
    this.getEvents((states) => {
      console.log(states, 'states')
      this.setState(states);
    });
  }

  // Geolocation tracking
  handleStartWalk(walkId) {
    this.startWatch(walkId);
  }

  handleFinishWalk() {
    this.stopWatch();
  }

  processGeoResult(walkId, position) {
    var geolocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: new Date(position.timestamp),
      accuracy: position.coords.accuracy,
      walk_id: walkId
    };

    console.log(`SUCCESS latitude:${position.coords.latitude}, longitutde:${position.coords.longitude}, accuracy:${position.coords.accuracy}, timestamp:${new Date(position.timestamp)}`); // TODO remove
    this.postGeolocation(geolocation);
    // this.setState({
    //   geolocations: this.state.geolocations.concat(geolocation)
    // });
  }

  handleGeoError(error) {
    console.log('ERROR failed to retrieve your location: ' + error);
  }

  startWatch(walkId) {
    var watchId = navigator.geolocation.watchPosition(this.processGeoResult.bind(this, walkId), this.handleGeoError, {
      maximumAge: this.state.tracking.maximumAge,
      timeout: this.state.tracking.timeout,
      enableHighAccuracy: this.state.tracking.enableHighAccuracy
    });
    this.setState((prevState) => {
      var newState = Object.assign({}, prevState);
      newState.tracking.watchId = watchId;
      return newState;
    });
    console.log('STARTING WALK'); // TODO change to snackbar
  }

  stopWatch() {
    navigator.geolocation.clearWatch(this.state.watchId);
    this.setState((prevState) => {
      var newState = Object.assign({}, prevState);
      newState.tracking.watchId = null;
      return newState;
    });
    console.log('STOPPING WALK'); // TODO change to snackbar
  }

  postGeolocation(geolocation) {
    $.post('/api/walks/track', geolocation)
      .then((data) => {
        console.log('SUCCESS sending geolocation ', data);
      })
      .fail((err) => {
        console.log('ERROR sending geolocation ', err);
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
        <DialogForm
          handleTextInputChange={this.handleTextInputChange}
          open={this.state.formOpen}
          handleClose={this.handleFormClose}
          handleOpen={this.handleFormOpen}
          handleSubmit={this.handleSubmit}
          start={this.state.start_walker}
          end={this.state.end_walker}
          price={this.state.price}
          location={this.state.location}/>
        <EventDialog
          handleCancel={this.handleCancel}
          open={this.state.eventOpen}
          handleClose={this.handleEventClose}
          handleOpen={this.handleEventOpen}
          selectedEvent={this.state.selectedEvent}
          handleStartWalk={this.handleStartWalk}
          handleFinishWalk={this.handleFinishWalk} />
        <SnackBarCom
          open={this.state.snackBarOpen}
          handleSnackBarClose={this.handleSnackBarClose}
          message={'Refund successful'} />
      </div>
    );
  }
}

export default Calendar;
