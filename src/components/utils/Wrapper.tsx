import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',

  },
});

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      {children}
    </Box>
  );
}

export default Wrapper;
