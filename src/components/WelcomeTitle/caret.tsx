import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    minHeight: '5rem',
    minWidth: '0.2rem',
    fontSize: '5rem',
    backgroundColor: theme.palette.secondary.dark,
  },
  blink: {
    backgroundColor: 'initial',
  },
}));

function Caret() {
  const classes = useStyles();
  const [classNames, setClasNames] = useState(classes.root);

  useEffect(() => {
    setInterval(() => {
      setClasNames((names) => {
        if (names.split(' ').length === 1) return `${classes.root} ${classes.blink}`;
        return classes.root;
      });
    }, 500);
  }, []);

  return (
    <Box className={classNames} />
  );
}

export default Caret;
