import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectExampleMsg } from 'store/features/example';
import { useTheme } from '@material-ui/core';
import Header from 'components/Header';
import WelcomeTitle from 'components/WelcomeTitle';

export default function App(): JSX.Element {
  // const message = useSelector(selectExampleMsg);

  useEffect(() => {
    document.getElementById('jss')?.remove();
  });

  useTheme();

  return (
    <>
      <Header />
      <WelcomeTitle />
    </>
  );
}
