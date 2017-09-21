import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import '../../../public/componentCSS/centered_circular_progress.css';

const CenteredCircularProgress = () => (
  <div className="centered-circular-progress">
    <CircularProgress
      size={100}
      thickness={8}
    />
  </div>
);

export default CenteredCircularProgress;
