import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OptionsButton from './OptionsButton';

import './styles.css';

function Controls(props) {
  return (
    <>
      <div className="controlBox">
        <div className="buttonDiv">
          <Typography variant="h5">Controls:</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.play()}
          >
            Play
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.pause()}
          >
            Pause
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.step()}
          >
            Step To Next Generation
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.randomize()}
          >
            Randomize
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.reset()}
          >
            Clear
          </Button>
        </div>
        <Typography>Preset Objects:</Typography>
        <OptionsButton handlePresetObj={props.handlePresetObj} />
      </div>
    </>
  );
}

export default Controls;
