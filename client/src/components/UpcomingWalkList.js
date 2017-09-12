import React from 'react';
import UpcomingWalkItem from './UpcomingWalkItem';
import {Link} from 'react-router-dom';

const UpcomingWalkList = (props) => (
  <div>
    <h2>Upcoming Walks</h2>
    {props.upcomingwalks.length > 0 ? 
      props.upcomingwalks.map((walk) => (
        <UpcomingWalkItem key={`walk-${walk.id}`} walk={walk} cancelWalk={props.cancelWalk} />
      )) :
      <p>No upcoming walks at this time. <Link to="/browse" >Browse for walks here!</Link></p>
    }
  </div>
);

export default UpcomingWalkList;

