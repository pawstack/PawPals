import React from 'react';
import BrowseListItem from './BrowseListItem';

const BrowseList = (props) => (
  <div>
    {props.walks.map((walk) => (
      <BrowseListItem key={`walk-${walk.id}`} walk={walk} selectWalk={props.selectWalk} />
    ))}
  </div>
);

export default BrowseList;
