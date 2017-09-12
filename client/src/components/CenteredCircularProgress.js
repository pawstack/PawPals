import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const CenteredCircularProgress = () => (
  <div style={{position: 'fixed', top: '50%', left: '50%', marginTop: -50, marginLeft: -50}} >
    <CircularProgress 
      size={100}
      thickness={8}
    />        
  </div>
);

export default CenteredCircularProgress;
