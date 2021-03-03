import React from 'react';
import {
  Container, Link, Typography,
} from '@material-ui/core';

export default function Footer() {
  return (
    <Container component="footer">
      <Typography align="center">
        <Link href="https://github.com/ortophius">@ortophius</Link>
        {' / '}
        <Link href="https://github.com/ortophius/code-it">code-it</Link>
      </Typography>
    </Container>
  );
}
