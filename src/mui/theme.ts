import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      main: '#673fb5',
    },
    secondary: {
      light: '#fff030',
      main: orange[800],
    },
  },
  overrides: { },
}));

export default theme;
