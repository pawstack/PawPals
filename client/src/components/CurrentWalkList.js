import React from 'react';
import CurrentWalkItem from './CurrentWalkItem';

const CurrentWalkList = (props) => (
  <div>
    <h2>Upcoming Walks</h2>
    {props.currentwalks.map((walk) => (
      <CurrentWalkItem key={`walk-${walk.id}`} walk={walk} cancelWalk={props.cancelWalk} />
    ))}
  </div>
);

export default CurrentWalkList;

