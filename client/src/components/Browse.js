import React from 'react';
import BrowseFilter from './BrowseFilter';
import BrowseList from './BrowseList';
import $ from 'jquery';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: []
    };
    this.getWalks = this.getWalks.bind(this);
  }

  componentWillMount() {
    this.getWalks();
  }

  getWalks(filters) {
    filters = filters || {};
    $.post('/api/walks/search', filters)
      .done((data) => {
        console.log('SUCCESS getWalks in Browse ', data);        
        this.setState({
          walks: data.walks
        });
      }).fail((err) => {
        console.log('ERROR getWalks in Browse ', error);
      }); 
  }

  render() {
    return (
      <div>
        <BrowseFilter getWalks={this.getWalks} />
        <BrowseList walks={this.state.walks} />
      </div>
    );
  }
}

export default Browse;
