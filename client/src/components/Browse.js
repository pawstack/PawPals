import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import BrowseFilter from './BrowseFilter';
import BrowseList from './BrowseList';
import $ from 'jquery';
import Confirmation from './Confirmation.jsx';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import geolib from 'geolib';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: [],
      selectedWalk: {},
      selectedWalkIndex: null,
      ownerInfo: {},
      dogInfo: {},
      pickupAddress: '',
      totalPrice: 0,
      snackBarOpen: false,
      filterOpen: true,
      start_owner: null,
      end_owner: null,
      backButton: false,
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
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  getWalks(filters) {
    this.setState({backButton: false});
    $.post('/api/walks/search', filters)
      .done((data) => {
        console.log('SUCCESS getWalks in Browse ', data);
        this.filterLocation(data.walks);
        this.setState({
          ['start_owner']: data.start,
          ['end_owner']: data.end
        });
      }).fail((err) => {
        console.log('ERROR getWalks in Browse ', error);
      });
  }

  filterLocation(walks) {
    this.getOwnerInfo(() => {
      if (!this.state.pickupAddress) {
        this.setState({['pickupAddress']: this.state.ownerInfo.address}, () => {
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
                  {'latitude': walks[i].latitude, 'longitude': walks[i].longitude},
                  pickUpLatLng, 10, 1);
                if (distance < Number(walks[i].walk_zone_radius) * 1000) {
                  nearbyWalks.push(walks[i]);
                }
              }
              this.setState({
                ['walks']: nearbyWalks
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
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
                {'latitude': walks[i].latitude, 'longitude': walks[i].longitude},
                pickUpLatLng, 10, 1);
              if (distance < Number(walks[i].walk_zone_radius) * 1000) {
                nearbyWalks.push(walks[i]);
              }
            }
            this.setState({
              ['walks']: nearbyWalks
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  selectWalk(walk, index) {
    this.setState({
      selectedWalk: walk,
      selectedWalkIndex: index,
      backButton: true
    });
  }

  getOwnerInfo(callback) {
    $.get('/api/walks/getOwnerInfo')
      .done((data) => {
        this.setState({
          ownerInfo: data
        }, function() {
          this.getDogInfo(callback);
        });
      })
      .fail((err) => {
        console.log('ERROR retreiving ownerInfo ', err);
      });
  }

  getDogInfo(callback) {
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
        }, () => { callback(); });
      },
      error(err) {
        console.log('ERROR retrieving dogInfo ', err);
      }
    });
  }

  resetSelectedState() {
    this.setState({
      selectedWalk: {},
      backButton: true
    });
  }

  setPickupAddress(location) {
    this.setState({
      pickupAddress: location
    });
  }

  processPayment() {
    // console.log(this.state.start_owner, this.state.end_owner);
    // console.log(this.state, 'states');
    $.ajax({
      type: 'POST',
      url: '/api/walks/payment',
      context: this,
      data: {
        amount: this.state.totalPrice * 100,
        walkerUserID: this.state.selectedWalk.walker_id,
        walkID: this.state.selectedWalk.id,
        description: 'PawPals',
        percentRetainedByPlatform: 10,
        ownerID: this.state.ownerInfo.id,
        pickupAddress: this.state.pickupAddress,
        dogID: this.state.dogInfo.id,
        start_owner: this.state.start_owner,
        end_owner: this.state.end_owner,
      },
      success: function() {
        this.setState((prevState) => (
          {
            snackBarOpen: true,
            walks: prevState.walks.slice(0, prevState.selectedWalkIndex).concat(prevState.walks.slice(prevState.selectedWalkIndex + 1)),
            selectedWalkIndex: null
          }
        ), function() {
          this.resetSelectedState();
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

  // componentDidMount() {
    // const todayJS = moment().startOf('day').toDate();
    // this.getWalks({
    //   minDate: todayJS,
    //   startDate: null,
    //   duration: null,
    //   pickupTime: null,
    //   price: 100,
    //   selectedSort: 'price',
    // });
  // }

  handleSnackBarClose() {
    this.setState({
      snackBarOpen: false
    });
  }

  toggleFilter() {
    this.setState((prevState) => ({
      filterOpen: !prevState.filterOpen
    }));
  }

  render() {
    if (!this.state.selectedWalk.walker) {
      return (
        <div>
          <div>
            <RaisedButton
              label="Open Filter"
              labelPosition="before"
              primary={true}
              icon={<FilterList />}
              onClick={this.toggleFilter}
              style={{ 'margin': 12 }}
            />
          </div>
          <div>
            <BrowseFilter
              pickupAddress={this.state.pickupAddress}
              setPickupAddress = {this.setPickupAddress}
              pickupAddress = {this.state.pickupAddress}
              getWalks={this.getWalks}
              start_owner={this.state.start_owner}
              end_owner={this.state.end_owner}
              filterOpen={this.state.filterOpen}
              toggleFilter={this.toggleFilter} />
          </div>
          <BrowseList
            walks={this.state.walks}
            ownerInfo = {this.state.ownerInfo}
            start_owner={this.state.start_owner}
            end_owner={this.state.end_owner}
            selectWalk={this.selectWalk} />
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
            start_owner={this.state.start_owner}
            end_owner={this.state.end_owner}
            backButton={this.state.backButton}
          />
        </div>
      );
    }
  }
}

export default Browse;
