import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import BrowseFilter from './BrowseFilter';
import BrowseList from './BrowseList';
import $ from 'jquery';
import Confirmation from './Confirmation.jsx';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import geolib from 'geolib';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: [],
      selectedWalk: {},
      ownerInfo: {},
      dogInfo: {},
      pickupAddress: '',
      totalPrice: 0,
      snackBarOpen: false
    };
    this.getWalks = this.getWalks.bind(this);
    this.selectWalk = this.selectWalk.bind(this);
    this.getOwnerInfo = this.getOwnerInfo.bind(this);
    this.getDogInfo = this.getDogInfo.bind(this);
    this.resetSelectedState = this.resetSelectedState.bind(this);
    this.setPickupAddress = this.setPickupAddress.bind(this);
    this.processPayment = this.processPayment.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.updateTotalPrice = this.updateTotalPrice.bind(this);
  }

  getWalks(filters) {
    $.post('/api/walks/search', filters)
      .done((data) => {
        //console.log('SUCCESS getWalks in Browse ', data);
        if (this.state.pickupAddress) {
          this.filterLocation(data);
        } else {
          this.setState({
            walks: data
          });
        }
      }).fail((err) => {
        console.log('ERROR getWalks in Browse ', error);
      });
  }

  filterLocation(walks) {
    geocodeByAddress(this.state.pickupAddress)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        var pickUpLatLng = {
          'latitude': latLng['lat'],
          'longitude': latLng['lng']
        };
        var nearbyWalks = [];
        for (var i = 0; i < walks.length; i++) {
          var distance = geolib.getDistanceSimple(
            {latitude: walks[i].latitude, longitude: walks[i].longitude},
            pickUpLatLng, 10, 1);
          if (distance < Number(walks[i].walk_zone_radius) * 1000) {
            nearbyWalks.push(walks[0]);
          }
        }
        this.setState({
          walks: nearbyWalks
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selectWalk(walk) {
    this.setState({
      selectedWalk: walk
    });
  }

  getOwnerInfo() {
    $.get('/api/walks/getOwnerInfo')
      .done((data) => {
        this.setState({
          ownerInfo: data
        }, function() {
          this.getDogInfo();
        });
      })
      .fail((err) => {
        console.log('ERROR retreiving ownerInfo ', err);
      });
  }

  getDogInfo() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/walks/getDogInfo',
      data: {
        ownerID: context.state.ownerInfo.id
      },
      success(data) {
        context.setState({
          dogInfo: data
        });
      },
      error(err) {
        console.log('ERROR retrieving dogInfo ', err);
      }
    });
  }

  resetSelectedState() {
    console.log('reseting the selected state');
    this.setState({
      selectedWalk: {}
    });
  }

  setPickupAddress(location) {
    console.log('updating set pickup location on browse ', location);
    this.setState({
      pickupAddress: location
    });
  }

  processPayment() {
    var context = this;
    $.ajax({
      type: 'POST',
      url: '/api/walks/payment',
      data: {
        amount: this.state.totalPrice * 100, //TBD WHEN BOOKED
        walkerUserID: this.state.selectedWalk.walker_id, //TBD WHEN BOOKED.  This will come from the selected walk state.
        walkID: this.state.selectedWalk.id, //TBD WHEN BOOKED.
        description: 'PawPals',
        percentRetainedByPlatform: 10,
        ownerID: this.state.ownerInfo.id,
        pickupAddress: this.state.pickupAddress,
        dogID: this.state.dogInfo.id
      },
      success: function() {
        context.setState({
          snackBarOpen: true
        }, function() {
          context.resetSelectedState();
        });

      },
      error: function() {
        console.log('client - error destination charge post request completed');
      }
    });
  }

  updateTotalPrice(totalPrice) {
    this.setState({
      totalPrice: totalPrice
    });
  }

  componentDidMount() {
    this.getOwnerInfo();
  }

  handleSnackBarClose() {
    this.setState({
      snackBarOpen: false
    });
  }

  render() {
    if (!this.state.selectedWalk.walker) {
      return (
        <div>
          <BrowseFilter pickupAddress={this.state.pickupAddress} setPickupAddress = {this.setPickupAddress} pickupAddress = {this.state.pickupAddress} getWalks={this.getWalks} />
          <BrowseList walks={this.state.walks} selectWalk={this.selectWalk} />
          <MuiThemeProvider>
            <Snackbar
              open={this.state.snackBarOpen}
              message = {'Your booking is confirmed!'}
              autoHideDuration= {6000}
              onRequestClose={this.handleSnackBarClose}
            />
          </MuiThemeProvider>

        </div>
      );
    } else if (this.state.selectedWalk.walker) {
      return (
        <div>
          <Confirmation
            ownerInfo = {this.state.ownerInfo}
            dogInfo = {this.state.dogInfo}
            walks = {this.state.walks}
            selectedWalk = {this.state.selectedWalk}
            resetSelectedState ={this.resetSelectedState}
            pickupAddress = {this.state.pickupAddress}
            processPayment = {this.processPayment}
            updateTotalPrice = {this.updateTotalPrice}
            totalPrice = {this.state.totalPrice}
          />
        </div>
      );
    }
  }
}

export default Browse;
