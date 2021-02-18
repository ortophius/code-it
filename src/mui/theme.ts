import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'dark',
  },
  overrides: { },
}));

export default theme;
