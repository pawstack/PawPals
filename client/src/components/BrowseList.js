import React from 'react';
import BrowseListItem from './BrowseListItem';

const BrowseList = (props) => (
  <div>
    <h2>Search Results</h2>
    {props.walks.map((walk) => (
      <BrowseListItem key={`walk-${walk.id}`} walk={walk}/>
    ))}
  </div>
);

export default BrowseList;
