import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  wrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingTop: '1rem',
    }
})

function Wrapper(props: React.PropsWithChildren<{}>) {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      {props.children}
    </Box>
  )
}

export default Wrapper;