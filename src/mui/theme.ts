import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'dark',
    secondary: orange,
  },
  overrides: { },
}));

export default theme;
