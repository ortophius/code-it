import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Caret from './caret';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    lineHeight: 1,
    fontSize: '5rem',
    fontFamily: 'monospace',
  },
});

function WelcomeTitle() {
  const classes = useStyles();
  const [text, setText] = useState('');

  const queueTyping = (char: string, time: number) => {
    setTimeout(() => {
      if (char === '<') setText((str) => str.slice(0, -1));
      else setText((str) => str + char);
    }, time);
  };

  const startTyping = () => {
    'Code/<.it'.split('').reduce((totalTime, char) => {
      queueTyping(char, totalTime);
      const timeOffset = (Math.random() * 150) + 200;

      return totalTime + timeOffset;
    }, 0);
  };

  useEffect(() => {
    startTyping();
  }, []);

  return (
    <Container className={classes.root}>
      <Typography className={classes.txt} component="h2">
        {text}
      </Typography>
      <Caret />
    </Container>
  );
}

export default WelcomeTitle;
