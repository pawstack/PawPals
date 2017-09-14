import React from 'react';
import $ from 'jquery';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  Polyline
} from 'react-google-maps';

// const GoogleMapWrapper = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={15}
//     center={props.center}
//   >
//   <div>
//     {props.markers.map(marker => (
//       <Marker
//         key={`geoloc-${marker.id}`}
//         position={{lat: Number(marker.latitude), lng: Number(marker.longitude)}}
//         defaultAnimation={2}
//       />
//     ))}
//     <Polyline
//       path={[{lat: 37.7835164, lng: -122.4091674}, {lat: 37.786161, lng: -122.4102922}]}
//       defaultAnimation={2}
//       geodesic= {true}
//       strokeColor = {'#FF0000'}
//        strokeOpacity = {1.0}
//        strokeWeight = {2}
//     />
//   </div>
//
//   </GoogleMap>
// ));

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    center={props.center}
  >
    <div>
      <Polyline
        path={props.polyLineData}
        defaultAnimation={2}
        geodesic= {true}
        strokeColor = {'#FF0000'}
        strokeOpacity = {1.0}
        strokeWeight = {2}
      />
    </div>
  </GoogleMap>
));

export default class FindMyDogMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: {lat: 0, lng: 0},
      polyLineData: []
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.getGeolocations = this.getGeolocations.bind(this);
  }

  componentDidMount() {
    this.getGeolocations();
  }

  handleMapLoad(map) {
    console.log('map is ', map);
    this._mapComponent = map;
  }

  getGeolocations() {
    $.get('/api/walks/track', {walkId: this.props.walkId})
      .then((data) => {
        console.log('SUCCESS getting geolocation ', data);
        var polydata = data.map(function(item, index) {
          return {lat: Number(item.latitude), lng: Number(item.longitude)};
        });
        console.log('the poly data array is ', polydata);
        this.setState({
          markers: data,
          center: data.length > 0 ? {lat: Number(data[0].latitude), lng: Number(data[0].longitude)} : {lat: 0, lng: 0},
          polyLineData: polydata
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
          polyLineData = {this.state.polyLineData}
        />
      </div>
    );
  }
}
