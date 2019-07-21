import React, { Component } from 'react';
// import Rules from './Rules';
import Controls from './Controls';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';

class GridCanvas extends Component {
  constructor(props) {
    super(props);
    this.numberCellsWide = this.props.width / this.props.cellWidth;
    this.numberCellsTall = this.props.height / this.props.cellHeight;
    let cells = new Array(this.numberCellsTall);
    for (let i = 0; i < this.numberCellsTall; i++) {
      cells[i] = new Array(this.numberCellsWide);
      for (let j = 0; j < this.numberCellsWide; j++) {
        cells[i][j] = 0;
      }
    }
    this.state = {
      cells,
      generation: 0
    };
  }

  runLife = () => {
    this.intervalId = setInterval(() => this.stepToNextGen(), 200);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  randomize() {
    // first off, clear the board
    this.clearBoard();

    let randomized = [];
    // generate values 0 or 1 for each cell
    for (let i = 0; i < this.numberCellsTall; i++) {
      let row = [];
      for (let j = 0; j < this.numberCellsWide; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      randomized.push(row);
    }

    this.setState({ cells: randomized });
    // redraw
    this.redraw(randomized);
  }

  stepToNextGen() {
    this.setState({ generation: this.state.generation + 1 });

    let cells = arrayClone(this.state.cells);

    let newCells = arrayClone(cells);

    for (let i = 0; i < this.numberCellsTall; i++) {
      for (let j = 0; j < this.numberCellsWide; j++) {
        // const before = cells[i][j];
        let count = 0;

        if (i !== 0) {
          // only check top row if not the top row
          if (j !== 0) {
            // NorthWest -- only check if not top row or not at starting column
            count += cells[i - 1][j - 1] ? 1 : 0;
          }

          // every cell that isnt the top row will have a North
          count += cells[i - 1][j] ? 1 : 0;

          // Check Northeast only if not the last column
          if (j !== this.numberCellsWide - 1) {
            count += cells[i - 1][j + 1] ? 1 : 0;
          }
        }

        if (i < this.numberCellsTall - 1) {
          // only check bottom row if not the bottom row
          if (j !== 0) {
            //SW -  only check if also not in first column
            count += cells[i + 1][j - 1] ? 1 : 0;
          }

          // S - all rows that are not the bottom will have a S
          count += cells[i + 1][j] ? 1 : 0;

          if (j !== this.numberCellsWide - 1) {
            // SE - only check if also not in last column
            count += cells[i + 1][j + 1] ? 1 : 0;
          }
        }

        if (j < this.numberCellsWide - 1) {
          // only check easterly neightbor if not on end
          count += cells[i][j + 1] ? 1 : 0;
        }

        if (j !== 0) {
          // only check westerly neightbor if not at begining
          count += cells[i][j - 1] ? 1 : 0;
        }

        // decide if cell lives
        if (cells[i][j] === 1 && (count < 2 || count > 3)) {
          //cell dies
          newCells[i][j] = 0;
        }

        if (cells[i][j] === 0 && count === 3) {
          // reanimate from the dead
          newCells[i][j] = 1;
        }
      }
    }

    this.setState({ cells: newCells });
    this.redraw(newCells);
  }

  // clears board, reinitializes cells to 0
  reset() {
    this.clearBoard();

    let cells = new Array(this.numberCellsTall);
    for (let i = 0; i < this.numberCellsTall; i++) {
      cells[i] = new Array(this.numberCellsWide);
      for (let j = 0; j < this.numberCellsWide; j++) {
        cells[i][j] = 0;
      }
    }
    this.setState({ cells, generation: 0 });
  }

  clearBoard() {
    // find canvas element, save as variable
    const canvas = this.refs.canvas;
    // creating a drawing object for our canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.props.width, this.props.height);
  }

  redraw(cells) {
    // first clear board
    this.clearBoard();
    // redraw based on state
    // find canvas element, save as variable
    const canvas = this.refs.canvas;
    // creating a drawing object for our canvas
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < this.numberCellsTall; i++) {
      for (let j = 0; j < this.numberCellsWide; j++) {
        if (cells[i][j] === 1) {
          ctx.fillRect(
            j * 20,
            i * 20,
            this.props.cellWidth,
            this.props.cellHeight
          );
          ctx.stroke();
        }
      }
    }
  }

  presetObjects = e => {
    let { name } = e.target;

    let cells;

    if (name === 'glider') {
      cells = new Array(this.numberCellsTall);
      for (let i = 0; i < this.numberCellsTall; i++) {
        cells[i] = new Array(this.numberCellsWide);
        for (let j = 0; j < this.numberCellsWide; j++) {
          if (i === 1 && j === 2) {
            cells[i][j] = 1;
          } else if (i === 2 && j === 3) {
            cells[i][j] = 1;
          } else if (i === 3 && (j === 1 || j === 2 || j === 3)) {
            cells[i][j] = 1;
          } else {
            cells[i][j] = 0;
          }
        }
      }
    }

    if (name === 'blinker') {
      cells = new Array(this.numberCellsTall);
      for (let i = 0; i < this.numberCellsTall; i++) {
        cells[i] = new Array(this.numberCellsWide);
        for (let j = 0; j < this.numberCellsWide; j++) {
          if (i === 4 && j === 4) {
            cells[i][j] = 1;
          } else if (i === 5 && j === 4) {
            cells[i][j] = 1;
          } else if (i === 6 && j === 4) {
            cells[i][j] = 1;
          } else {
            cells[i][j] = 0;
          }
        }
      }
    }

    if (name === 'unsure') {
      cells = new Array(this.numberCellsTall);
      for (let i = 0; i < this.numberCellsTall; i++) {
        cells[i] = new Array(this.numberCellsWide);
        for (let j = 0; j < this.numberCellsWide; j++) {
          if (i === 12 && j === 12) {
            cells[i][j] = 1;
          } else if (i === 13 && j === 12) {
            cells[i][j] = 1;
          } else if (i === 14 && j === 12) {
            cells[i][j] = 1;
          } else if ((i === 13 && j === 11) || j === 13) {
            cells[i][j] = 1;
          } else {
            cells[i][j] = 0;
          }
        }
      }
    }

    if (name === 'otherblinker') {
      cells = new Array(this.numberCellsTall);
      for (let i = 0; i < this.numberCellsTall; i++) {
        cells[i] = new Array(this.numberCellsWide);
        for (let j = 0; j < this.numberCellsWide; j++) {
          if (i === 12 && j === 12) {
            cells[i][j] = 1;
          } else if (i === 13 && j === 12) {
            cells[i][j] = 1;
          } else if (i === 14 && j === 12) {
            cells[i][j] = 1;
          } else if (i === 13 && (j === 11 || j === 13)) {
            cells[i][j] = 1;
          } else {
            cells[i][j] = 0;
          }
        }
      }
    }

    this.setState({ cells });
    this.redraw(cells);
  };

  handleClick(e) {
    // find canvas element, save as variable
    const canvas = this.refs.canvas;
    // creating a drawing object for our canvas
    const ctx = canvas.getContext('2d');

    // Get click coords
    let rect = canvas.getBoundingClientRect();
    let clickX = Math.floor(e.clientX - rect.left);
    let clickY = Math.floor(e.clientY - rect.top);
    let cellTopX, cellTopY;

    for (let i = clickX; i >= 0; i--) {
      if (i % this.props.cellWidth === 0) {
        cellTopX = i;
        break;
      }
    }
    for (let i = clickY; i >= 0; i--) {
      if (i % this.props.cellWidth === 0) {
        cellTopY = i;
        break;
      }
    }

    let column = cellTopX / this.props.cellWidth;
    let row = cellTopY / this.props.cellHeight;

    // make copy of current state of cells
    let updatedState = this.state.cells;

    if (updatedState[row][column] === 0) {
      // Toggle on by filling in cell
      ctx.fillRect(
        cellTopX,
        cellTopY,
        this.props.cellWidth,
        this.props.cellHeight
      );
      updatedState[row][column] = 1;
      this.setState({ cells: updatedState });
    } else {
      let stateCopy = [...this.state.cells];
      stateCopy[row][column] = 0;
      this.setState({ cells: stateCopy });
      // redraw
      this.redraw(stateCopy);
    }
  }

  componentDidMount() {
    // destructuring props
    const { width, height, cellHeight, cellWidth } = this.props;

    // this.requestAnimationFrame();

    // find canvas element, save as variable
    const canvas = this.refs.grid;
    // creating a drawing object for our canvas
    const ctx = canvas.getContext('2d');

    // draws grid:
    // draw outer rectangle and begin tracing path of grid
    ctx.clearRect(0, 0, width, height);
    ctx.translate(0.5, 0.5);
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.lineTo(0, 0);

    for (let x = cellWidth; x < width; x += cellWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    for (let y = cellHeight; y < height; y += cellHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();
  }

  render() {
    return (
      <>
        <Box position="relative">
          <Box position="absolute" top={0} left={0} zIndex={1}>
            <canvas
              ref="canvas"
              width={this.props.width + 1}
              height={this.props.height + 1}
              onClick={e => this.handleClick(e)}
            />
          </Box>
          <Box position="absolute" top={0} left={0} zIndex={0}>
            <canvas
              ref="grid"
              width={this.props.width + 1}
              height={this.props.height + 1}
            />
          </Box>
        </Box>
        <Controls />
        {/* <div className="leftPannel">
          <div className="controls">
            <h3>Generations: {this.state.generation}</h3>
            <button onClick={() => this.stepToNextGen()}>
              Next Generation
            </button>
            <button onClick={() => this.reset()}>Clear Board</button>
            <button onClick={() => this.randomize()}>Randomize</button>
            <button onClick={() => this.runLife()}>Play</button>
            <button onClick={() => this.pause()}>Pause</button>
          </div>
        </div> */}
      </>
      /* <div className="controls">
            <h3>Presets:</h3>
            <button name="glider" onClick={e => this.presetObjects(e)}>
              Glider
            </button>
            <button name="blinker" onClick={e => this.presetObjects(e)}>
              Blinker
            </button>
            <button name="unsure" onClick={e => this.presetObjects(e)}>
              Not Sure What This Is
            </button>
            <button name="otherblinker" onClick={e => this.presetObjects(e)}>
              Another Blinker
            </button>
          </div>
        </div> */
      /* <Rules /> */
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default GridCanvas;
