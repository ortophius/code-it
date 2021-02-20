import React from 'react';
import { Box, Container, Link, makeStyles, Typography, useTheme } from '@material-ui/core';

const useStyles = makeStyles({

});

export default function Footer() {
  const classes = useStyles();

  return (
    <Container component="footer">
      <Typography component="h5" align="center">
        <Link href="https://github.com/ortophius">@ortophius</Link>
          {" / "}
        <Link href="https://github.com/ortophius/code-it">code-it</Link>  
      </Typography>
    </Container>
  );
}
