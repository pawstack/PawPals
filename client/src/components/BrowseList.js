import React from 'react';
import BrowseListItem from './BrowseListItem';
import parser from 'parse-address';

class BrowseList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var title = {
      'false': 'Open the filter to start searching for walks!',
      'true': 'Search Results'
    };
    return (
       <div>
         <h2>{title[!!this.props.start_owner]}</h2>
        {this.props.walks.map((walk, index) => (
          <BrowseListItem key={`walk-${walk.id}`} start_owner={this.props.start_owner} end_owner={this.props.end_owner} walk={walk} index={index} selectWalk={this.props.selectWalk} />))}
        </div>
    );
  }
}
export default BrowseList;
