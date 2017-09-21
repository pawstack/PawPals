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
import moment from 'moment';
import '../../../public/componentCSS/find_my_dog_map.css';

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
      startLocation: {},
      endLocation: {},
      dataSoFar: []
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.getGeolocations = this.getGeolocations.bind(this);
    this.getLatestGeolocations = this.getLatestGeolocations.bind(this);
  }

  componentDidMount() {
    this.getGeolocations();
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  getGeolocations() { // gets all geolocation for this walk
    var context = this;
    $.get('/api/walks/track', {walkId: this.props.walkId})
      .then((data) => {
        var midpoint = Math.floor(data.length / 2);
        this.setState({
          center: data.length > 0 ? {lat: Number(data[midpoint].latitude), lng: Number(data[midpoint].longitude)} : {lat: 0, lng: 0},
          startLocation: {lat: Number(data[0].latitude), lng: Number(data[0].longitude)},
          dataSoFar: [].concat(data[data.length - 1]) // set the dataSoFar to be the last data point of geo location
        }, function() {
          var polydata = data.map(function(item, index) {
            return {lat: Number(item.latitude), lng: Number(item.longitude)};
          });
          var animatedPolyData = [];
          var animate = window.setInterval(function() {
            animatedPolyData = animatedPolyData.concat(polydata.splice(0, 1));
            context.setState({
              polyLineData: animatedPolyData,
              endLocation: {lat: Number(animatedPolyData[animatedPolyData.length - 1].lat), lng: Number(animatedPolyData[animatedPolyData.length - 1].lng)}
            }, function() {
              if (polydata.length === 0) {
                window.clearInterval(animate);
                //if this is a walk that is happening now -- retrieve new data every 30 seconds
                if (this.props.walk && moment(Date.now()) > moment(this.props.walk.session_start) && moment(Date.now()) < moment(this.props.walk.session_end)) {
                  var getLiveGeolocations = window.setInterval(function() {
                    context.getLatestGeolocations();
                    if (!context.props.walk || moment(Date.now()) > moment(context.props.walk.session_end)) {
                      window.clearInterval(getLiveGeolocations);
                    }
                  }, 30000);
                }
              }
            });
          }, 210);
        });
      })
      .fail((err) => {
        console.log('Error retrieving geolocation data for this walk', err);
      });
  }

  getLatestGeolocations() {
    var latestTimeStamp = '';

    //if the dataSoFar is empty, set the last time stamp to be when the walk started.
    if (this.state.dataSoFar.length === 0) {
      latestTimeStamp = this.props.walk.session_start;
    } else {
      latestTimeStamp = this.state.dataSoFar[this.state.dataSoFar.length - 1].timestamp;
    }

    //retrieve all walks later than the latest time stamp.
    $.ajax({
      method: 'GET',
      url: '/api/walks/trackRealTime',
      data: {
        walkId: this.props.walkId,
        latestTimeStamp: this.state.dataSoFar[this.state.dataSoFar.length - 1].timestamp
      },
      context: this,
      success(data) {
        this.setState({
          dataSoFar: this.state.dataSoFar.concat(data)
        }, function() {
          //convert the latest retreived data to polydata format.
          if (data.length > 0) {
            var latestPolyData = data.map(function(item, index) {
              return {lat: Number(item.latitude), lng: Number(item.longitude)};
            });
            this.setState({
              polyLineData: this.state.polyLineData.concat(latestPolyData),
              endLocation: {lat: Number(data[data.length - 1].latitude), lng: Number(data[data.length - 1].longitude)}
            });
          }
        });
      },
      error(err) {
        console.log('Error retrieving latest live Geo Data ', err);
      }
    });
  }


  render() {
    return (
      <div className="main-div">
        <GoogleMapWrapper
          containerElement={
            <div className="element" />
          }
          mapElement={
            <div className="element" />
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
