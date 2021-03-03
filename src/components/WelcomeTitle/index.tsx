import {
  Box, Container, Link, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Caret from './caret';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    minHeight: '30vh',
  },
  title: {
    paddingLeft: '10rem',
    justifyContent: 'flex-start',
    flexGrow: 1,
    backgroundColor: '#1b1b1b',
  },
  txt: {
    lineHeight: 1,
    fontSize: '5rem',
    fontFamily: 'monospace',
    color: 'white',
  },
  motto: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 6rem',
  },
});

function WelcomeTitle() {
  const classes = useStyles();
  const [text, setText] = useState('');

  const title = 'Code/<.it';

  const queueTyping = (char: string, time: number) => {
    setTimeout(() => {
      if (char === '<') setText((str) => str.slice(0, -1));
      else setText((str) => str + char);
    }, time);
  };

  const startTyping = () => {
    title.split('').reduce((totalTime, char) => {
      queueTyping(char, totalTime);
      const timeOffset = (Math.random() * 300) + 150;
      return totalTime + timeOffset;
    }, 0);
  };

  useEffect(() => {
    startTyping();
  }, []);

  return (
    <Container>
      <Paper className={classes.root} elevation={3}>
        <Box className={classes.title} display="flex" alignItems="center" justifyContent="center">
          <Typography className={classes.txt} component="h2">
            {text}
          </Typography>
          <Caret />
        </Box>
        <Box className={classes.motto}>
          <Typography component="h3">
            {'Yet another '}
            <Link href="https://codepen.io/" color="secondary" variant="inherit">
              CodePen
            </Link>
            {' clone'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default WelcomeTitle;
