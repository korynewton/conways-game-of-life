import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridCanvas from './components/GridCanvas';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={0} direction="column" alignItems="center">
        <Typography variant="h2">Conway's Game of Life</Typography>
      </Grid>
      <Grid>
        <GridCanvas width={640} height={540} cellHeight={20} cellWidth={20} />
      </Grid>
    </MuiThemeProvider>
  </>
);

export default App;
