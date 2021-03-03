import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

interface SpacingProps {
  gap?: number;
}

const defaultProps = {
  gap: 1,
};

const useStyles = makeStyles((theme) => ({
  root: ({ gap = 1 }: SpacingProps) => ({
    minHeight: `${theme.spacing(gap)}`,
  }),
}));

function Spacing({ gap }: SpacingProps) {
  const classes: { root: string } = useStyles({ gap });
  return (
    <Box className={classes.root} />
  );
}

Spacing.defaultProps = defaultProps;

export default Spacing;
