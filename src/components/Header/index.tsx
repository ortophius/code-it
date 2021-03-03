import React from 'react';
import {
  AppBar, Button, ButtonGroup, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

type CreateProjectResponse = {
  link: string;
};

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
    color: theme.palette.secondary.light,
  },
}));

export default function Header() {
  const history = useHistory();
  const classes = useStyles();

  const handleCreateProject = async () => {
    const url = (window) ? '/v1/create' : 'http://localhost:8081/v1/create';
    const res = await axios.post<CreateProjectResponse>(url);
    if (res.status === 201) history.push(`project/${res.data.link}`);
  };

  return (
    <AppBar className={classes.noShadow} position="sticky">
      <Toolbar variant="dense" className={classes.root}>
        <Typography component="span" className={classes.logo}>
          Code&nbsp;/&nbsp;
          <span className={classes.it}>it</span>
        </Typography>
        <ButtonGroup color="inherit" variant="text">
          <Button onClick={handleCreateProject}>Create project</Button>
          <Button>Log in</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
