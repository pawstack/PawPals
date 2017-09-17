import React from 'react';
import BrowseListItem from './BrowseListItem';
import parser from 'parse-address';

class BrowseList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var title;
    if (!!this.props.start_owner) {
      if (this.props.walks.length > 0) {
        title = 'Search Results';
      } else {
        title = 'No walks found, try changing your filter options';
      }
    } else {
      title = 'Open the filter to start searching for walks!';
    }
    return (
       <div>
         <h2>{title}</h2>
        {this.props.walks.map((walk, index) => (
          <BrowseListItem key={`walk-${walk.id}`} start_owner={this.props.start_owner} end_owner={this.props.end_owner} walk={walk} index={index} selectWalk={this.props.selectWalk} />))}
        </div>
    );
  }
}
export default BrowseList;
