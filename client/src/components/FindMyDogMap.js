import React from 'react';
import $ from 'jquery';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  LatLngBounds,
  LatLng
} from 'react-google-maps';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    zoom={props.zoom}
    center={props.center}
  >
    <div>
      <Polyline
        path={props.polyLineData}
        defaultAnimation={2}
        geodesic= {true}
        options = {{
          strokeColor: '#26194C',
          strokeOpacity: 0.5,
          strokeWeight: 5
        }}
      />
    </div>
    <div>
      <Marker
        position = {props.endLocation}
        icon={{scaledSize: new google.maps.Size(50, 53), url: 'https://cdn1.iconfinder.com/data/icons/supericon-animals-1/512/Dog_SC.png'}}
      />
    </div>
  </GoogleMap>
));

export default class FindMyDogMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 0, lng: 0},
      polyLineData: [],
      zoom: 16,
      staticData: [],
      startLocation: {},
      endLocation: {}
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
    var context = this;
    $.get('/api/walks/track', {walkId: this.props.walkId})
      .then((data) => {
        var midpoint = Math.floor(data.length / 2);
        this.setState({
          markers: data,
          center: data.length > 0 ? {lat: Number(data[midpoint].latitude), lng: Number(data[midpoint].longitude)} : {lat: 0, lng: 0},
          startLocation: {lat: Number(data[0].latitude), lng: Number(data[0].longitude)},
        }, function() {
          var polydata = data.map(function(item, index) {
            return {lat: Number(item.latitude), lng: Number(item.longitude)};
          });
          var animatedPolyData = [];
          var animate = window.setInterval(function() {
            animatedPolyData = animatedPolyData.concat(polydata.splice(0, 1));
            context.setState({
              polyLineData: animatedPolyData
            }, function() {
              if (polydata.length === 0) {
                window.clearInterval(animate);
                this.setState({
                  endLocation: {lat: Number(data[data.length - 1].latitude), lng: Number(data[data.length - 1].longitude)}
                });
              }
            });
          }, 20);
        });
      })
      .fail((err) => {
        console.log('ERROR getting geolocation ', err);
      });

  }


  render() {
    return (
      <div style={{height: 400}}>
        <GoogleMapWrapper
          containerElement={
            <div style={{ height: '100%', width: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%', width: '100%' }} />
          }
          onMapLoad={this.handleMapLoad}
          center={this.state.center}
          zoom = {this.state.zoom}
          polyLineData = {this.state.polyLineData}
          onClick = {this.props.updateAnimateState}
          startLocation = {this.state.startLocation}
          endLocation = {this.state.endLocation}
        />
      </div>
    );
  }
}
