import React from 'react';
import PastWalkItem from './PastWalkItem';

const PastWalkList = (props) => (
  <div>
    <h2>Past Walks</h2>
    {props.pastwalks.map((walk) => (
      <PastWalkItem key={`walk-${walk.id}`} walk={walk} />
    ))}
  </div>
);

export default PastWalkList;

