import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles.css';

function Controls() {
  return (
    <>
      <div className="controlBox">
        <Typography variant="h5">Controls:</Typography>
        <div className="buttonDiv">
          <Button variant="contained" color="primary">
            Play
          </Button>
          <Button variant="contained" color="primary">
            Pause
          </Button>
          <Button variant="contained" color="primary">
            Step To Next Generation
          </Button>
          <Button variant="contained" color="primary">
            Randomize
          </Button>
          <Button variant="contained" color="primary">
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}

export default Controls;
