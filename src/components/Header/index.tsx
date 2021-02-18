import React from 'react';
import {
  AppBar, Box, Button, ButtonGroup, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'space-between',
  },
  noShadow: {
    boxShadow: 'none',
  },
  logo: {
    fontSize: 18,
    fontWeight: 600,
    textTransform: 'uppercase',
    transition: 'color 0.2s',
  },
  it: {
    color: orange[500],
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.noShadow} position="sticky">
      <Toolbar variant="dense" className={classes.root}>
        <Typography component="span" className={classes.logo}>
          Code&nbsp;/&nbsp;
          <span className={classes.it}>it</span>
        </Typography>
        <ButtonGroup variant="text">
          <Button>Create project</Button>
          <Button>Log in</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
