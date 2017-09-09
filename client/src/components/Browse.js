import React from 'react';
import BrowseFilter from './BrowseFilter';
import BrowseList from './BrowseList';
import $ from 'jquery';
import Confirmation from './Confirmation.jsx';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: [],
      selectedWalk: {},
      ownerInfo: {},
      dogInfo: {},
      pickupAddress: '',
    };
    this.getWalks = this.getWalks.bind(this);
    this.selectWalk = this.selectWalk.bind(this);
    this.getOwnerInfo = this.getOwnerInfo.bind(this);
    this.getDogInfo = this.getDogInfo.bind(this);
    this.resetSelectedState = this.resetSelectedState.bind(this);
    this.setPickupAddress = this.setPickupAddress.bind(this);

  }

  getWalks(filters) {
    $.post('/api/walks/search', filters)
      .done((data) => {
        // console.log('SUCCESS getWalks in Browse ', data);
        this.setState({
          walks: data
        });
      }).fail((err) => {
        console.log('ERROR getWalks in Browse ', error);
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

  componentDidMount() {
    console.log('component did mount');
    this.getOwnerInfo();
  }

  render() {
    if (!this.state.selectedWalk.walker) {
      return (
        <div>
          <BrowseFilter setPickupAddress = {this.setPickupAddress} pickupAddress = {this.state.pickupAddress} getWalks={this.getWalks} />
          <BrowseList walks={this.state.walks} selectWalk={this.selectWalk} />
        </div>
      );
    } else {
      return (
        <div>
          <Confirmation
            ownerInfo = {this.state.ownerInfo}
            dogInfo = {this.state.dogInfo}
            walks = {this.state.walks}
            selectedWalk = {this.state.selectedWalk}
            resetSelectedState ={this.resetSelectedState}
            pickupAddress = {this.state.pickupAddress}
          />
        </div>
      );
    }

  }
}

export default Browse;
