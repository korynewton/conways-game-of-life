import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridCanvas from './components/GridCanvas';

// import clsx from 'clsx';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#42a5f5'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00'
    }
    // error: will use the default color
  }
});

const App = () => (
  <>
    {/* CSS RESET */}
    <CssBaseline />
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      // justify="center"
      // style={{ minHeight: '100vh' }}
    >
      <MuiThemeProvider theme={theme}>
        <Typography variant="h1" component="h2">
          Conway's Game of Life
        </Typography>
        <GridCanvas width={540} height={540} cellHeight={20} cellWidth={20} />
      </MuiThemeProvider>
    </Grid>
  </>
);

export default App;
