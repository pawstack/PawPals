import React from 'react';
import BrowseListItem from './BrowseListItem';
import parser from 'parse-address';

class BrowseList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var streetAddress = parser.parseLocation(this.props.ownerInfo.address);
    var title = {
      'false': `Today's Walks Near ${streetAddress['number']} ${streetAddress['street']} ${streetAddress['type']}`,
      'true': "Search Results"
    }
    return(
       <div>
         <h2>{title[!!this.props.start_owner]}</h2>
        {this.props.walks.map((walk) => (
          <BrowseListItem key={`walk-${walk.id}`} start_owner={this.props.start_owner} end_owner={this.props.end_owner} walk={walk} selectWalk={this.props.selectWalk} />))}
        </div>
    )
  }
}
export default BrowseList;
