import React from 'react';
import PastWalkItem from './PastWalkItem';
import '../../../public/componentCSS/past-walk-list.css';

const PastWalkList = (props) => (
  <div>
    <h2 className = 'past-walks-header'>Past Walks</h2>
    {props.pastwalks.map((walk) => (
      <PastWalkItem key={`walk-${walk.id}`} walk={walk} />
    ))}
  </div>
);

export default PastWalkList;
