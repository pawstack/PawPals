import React from 'react';
import $ from 'jquery';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    center={props.center}
  >
    {props.markers.map(marker => (
      <Marker
        key={`geoloc-${marker.id}`}
        position={{lat: Number(marker.latitude), lng: Number(marker.longitude)}}
        defaultAnimation={2}
      />
    ))}
  </GoogleMap>
));

export default class FindMyDogMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: {lat: 0, lng: 0}
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.getGeolocations = this.getGeolocations.bind(this);    
  }

  componentDidMount() {
    this.getGeolocations();
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  getGeolocations() {
    $.get('/api/walks/track', {walkId: this.props.walkId})
      .then((data) => {
        // console.log('SUCCESS getting geolocation ', data);
        this.setState({
          markers: data,
          center: data.length > 0 ? {lat: Number(data[0].latitude), lng: Number(data[0].longitude)} : {lat: 0, lng: 0}
        });
      })
      .fail((err) => {
        console.log('ERROR getting geolocation ', error);
      });
  }

  render() {
    return (
      <div style={{height: 400}}>
        <GoogleMapWrapper
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.handleMapLoad}
          markers={this.state.markers}
          center={this.state.center}
        />
      </div>
    );
  }
}
