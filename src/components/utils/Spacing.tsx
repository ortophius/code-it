import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

interface SpacingProps {
  gap?: number
}

const useStyles = makeStyles((theme) => ({
  root: ({gap = 1}: SpacingProps) => ({
    margin: `${theme.spacing(gap)} 0`
  }),
}))

function Spacing(props: SpacingProps) {
  const classes = useStyles(props);
  return (
    <Box className={classes.root}></Box>
  )
}

export default Spacing;