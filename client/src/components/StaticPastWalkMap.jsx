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


class StaticPastWalkMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: {lat: 0, lng: 0},
      //polyLineData: [],
      //zoom: 16,
      staticData: [],
      startLocation: {},
      endLocation: {}
    };
    this.getGeolocations = this.getGeolocations.bind(this);
  }

  componentDidMount() {
    this.getGeolocations();
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

          var staticData = data.map(function(item, index) {
            return `${item.latitude},${item.longitude}`;
          });
          this.setState({
            startLocation: staticData[0],
            endLocation: staticData[staticData.length - 1]
          }, function() {
            this.setState({
              staticData: staticData.join('|')
            });
          });
        });
      })
      .fail((err) => {
        console.log('ERROR getting geolocation ', err);
      });

  }


  render() {
    return (
      <div >
        <img
          style={{width: '100%', height: '400px'}}
          onClick ={this.props.updateAnimateState}
          src = {`https://maps.googleapis.com/maps/api/staticmap?&zoom=16&path=color:black%7Cweight:5%7C${this.state.staticData}&markers=size:mid%7Ccolor:green%7Clabel:S%7C${this.state.startLocation}&markers=size:mid%7Ccolor:red%7Clabel:E%7C${this.state.endLocation}&scale=2&size=640x225&key=AIzaSyBvEUHNc1BSG-h4ZTcTxGZuBKjtFTrI9_8`}/>
      </div>
    );
  }
}

export default StaticPastWalkMap;


/*

<div >
  <img
    style={{width: '100%', height: '400px'}}
    onClick ={this.props.updateAnimateState}
    src = {`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.center}&zoom=16&path=${this.state.staticData}&scale=2&size=640x225&key=AIzaSyBvEUHNc1BSG-h4ZTcTxGZuBKjtFTrI9_8`}/>
</div>
*/