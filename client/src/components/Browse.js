import React from 'react';
import BrowseFilter from './BrowseFilter';
import BrowseList from './BrowseList';
import $ from 'jquery';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: [],
      selectedWalk: {}
    };
    this.getWalks = this.getWalks.bind(this);
    this.selectWalk = this.selectWalk.bind(this);
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

  render() {
    return (
      <div>
        <BrowseFilter getWalks={this.getWalks} />
        <BrowseList walks={this.state.walks} selectWalk={this.selectWalk} />
      </div>
    );
  }
}

export default Browse;
