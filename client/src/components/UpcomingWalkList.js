import React from 'react';
import UpcomingWalkItem from './UpcomingWalkItem';
import {Link} from 'react-router-dom';
import '../../../public/componentCSS/upcoming-walk-list.css';

const UpcomingWalkList = (props) => (
  <div>
    <h2>Upcoming Walks</h2>
    {props.upcomingwalks.length > 0 ?
      props.upcomingwalks.map((walk) => (
        <UpcomingWalkItem key={`walk-${walk.id}`} walk={walk} cancelWalk={props.cancelWalk} />
      )) :
      <div className = 'no-upcomming-walks'>
        No upcoming walks at this time.
        <br></br>
        <Link to="/browse" >Browse for walks here!
        </Link>
      </div>
    }
  </div>
);

export default UpcomingWalkList;
