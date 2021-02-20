import React from 'react';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import WelcomeTitle from 'components/WelcomeTitle';

const useStyles = makeStyles({

});

export default function App() {
  const classes = useStyles();

  return (
      <WelcomeTitle />
  );
}
