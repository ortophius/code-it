import React from 'react';
import {
  AppBar, Box, Button, ButtonGroup, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import {
  Switch, Link, Route, useHistory,
} from 'react-router-dom';
import axios from 'axios';
import Title from './title';

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
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    justifySelf: 'flex-start',
    fontSize: 18,
    fontWeight: 600,
    textTransform: 'uppercase',
    transition: 'color 0.2s',
  },
  it: {
    color: theme.palette.secondary.light,
  },
  title: {
    position: 'absolute',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, 0)',
  },
  buttons: {
  },
}));

export default function Header() {
  const history = useHistory();
  const classes = useStyles();

  const handleCreateProject = async () => {
    const url = (typeof window !== 'undefined') ? '/v1/create' : 'http://localhost:8081/v1/create';
    const res = await axios.post<CreateProjectResponse>(url);
    if (res.status === 201) history.push(`/project/${res.data.link}`);
  };

  return (
    <AppBar className={classes.noShadow} position="sticky">
      <Toolbar variant="dense" className={classes.root}>
        <Link to="/" className={classes.logoLink} replace>
          <Typography component="span" className={classes.logo}>
            Code&nbsp;/&nbsp;
            <span className={classes.it}>it</span>
          </Typography>
        </Link>
        <Switch>
          <Route path="/project/:id">
            <Box className={classes.title}>
              <Title />
            </Box>
          </Route>
        </Switch>
        <ButtonGroup color="inherit" variant="text" className={classes.buttons}>
          <Button onClick={handleCreateProject}>Create project</Button>
          <Button>Log in</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
