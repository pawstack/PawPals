import React from 'react';
import BrowseFilter from './BrowseFilter';
import BrowseList from './BrowseList';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: [{
        id: 1,
        walkerId: 2,
        walkerName: 'Paw Walker',
        dogId: 1,
        walkzonePt: '944 Market St, San Francisco, CA 94102',
        pickupAddress: '1655 Mission St, San Francisco, CA, 94103',
        walkzoneRadius: 3,
        price: 40
      }]
    };
    this.getWalks = this.getWalks.bind(this);
  }

  getWalks(filters) {
    // TODO: fetch to get a list of new walks
    // if filters given, filter query
    
  }

  handleFilter(filters) {
    console.log(arguments);
  }

  render() {
    return (
      <div>
        <BrowseFilter handleFilter={this.handleFilter} />
        <BrowseList walks={this.state.walks} />
      </div>
    );
  }
}

export default Browse;
