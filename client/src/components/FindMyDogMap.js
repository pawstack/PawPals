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
          strokeOpacity: 1,
          strokeWeight: 3
        }}
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
      polyLineData: [],
      zoom: 16
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.getGeolocations = this.getGeolocations.bind(this);
    this.fitExampleBounds = this.fitExampleBounds.bind(this);
  }

  componentDidMount() {
    this.getGeolocations();
  }

  handleMapLoad(map) {
    console.log('map is ', map);
    this._mapComponent = map;
  }

  fitExampleBounds() {
    console.log('**INSIDE OF fitExampleBounds');
    const overallBounds = this._mapComponent.getBounds();
    const center = this._mapComponent.getCenter();
    console.log('overallBounds is ', bounds2);
    console.log('center is ', center);
    //this._mapComponent.fitBounds(overallBounds);
    // var newZoom = this._mapComponent.getZoom();
    // console.log('zoom is ', newZoom);

    this.setState({
      center: center,
      //zoom: newZoom + 2
    });
  }

  getGeolocations() {
    var context = this;
    $.get('/api/walks/track', {walkId: this.props.walkId})
      .then((data) => {
        var midpoint = Math.floor(data.length / 2);
        this.setState({
          markers: data,
          center: data.length > 0 ? {lat: Number(data[midpoint].latitude), lng: Number(data[midpoint].longitude)} : {lat: 0, lng: 0},
        }, function() {

          var polydata = data.map(function(item, index) {
            return {lat: Number(item.latitude), lng: Number(item.longitude)};
          });

          var animatedPolyData = [];
          // console.log('poly data is ', polydata.shift());
          var animate = window.setInterval(function() {
            // console.log('the poly data length is ', polydata.length);
            animatedPolyData = animatedPolyData.concat(polydata.splice(0, 1));
            console.log(animatedPolyData);
            context.setState({
              polyLineData: animatedPolyData
            }, function() {
              if (polydata.length === 0) {
                window.clearInterval(animate);
                this.fitExampleBounds();
              }
            });
          }, 25);
          animate();
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
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.handleMapLoad}
          markers={this.state.markers}
          center={this.state.center}
          zoom = {this.state.zoom}
          polyLineData = {this.state.polyLineData}
        />
      </div>
    );
  }
}
