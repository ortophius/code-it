import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectExampleMsg } from 'store/features/example';
import { Box, useTheme } from '@material-ui/core';
import Header from 'components/Header';
import Home from 'components/Home';
import WelcomeTitle from 'components/WelcomeTitle';
import Spacing from 'components/utils/Spacing';
import Wrapper from 'components/utils/Wrapper';
import Footer from 'components/Footer';

export default function App(): JSX.Element {
  // const message = useSelector(selectExampleMsg);

  useEffect(() => {
    document.getElementById('jss')?.remove();
  });

  useTheme();

  return (
    <> 
      <Header />
      <Wrapper>
        <Home />
        <Spacing gap={2} />
        <Footer />
      </Wrapper>
    </>
  );
}
