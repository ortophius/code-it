import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core';
import Header from 'components/Header';
import Home from 'components/Home';
import Spacing from 'components/utils/Spacing';
import Wrapper from 'components/utils/Wrapper';
import Footer from 'components/Footer';
import { Switch, Route } from 'react-router-dom';
import Project from 'components/ProjectLayout';

export default function App(): JSX.Element {
  useEffect(() => {
    document.getElementById('jss')?.remove();
  });

  useTheme();

  return (
    <>
      <Header />
      <Spacing gap={2} />
      <Wrapper>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
        </Switch>
        <Spacing gap={2} />
        <Footer />
      </Wrapper>
    </>
  );
}
