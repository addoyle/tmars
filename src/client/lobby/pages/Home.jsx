import React from 'react';
import Container from '@material-ui/core/Container';
import { observer, inject } from 'mobx-react';

const Home = () => {
  return (
    <div className="home">
      <Container maxWidth="xl">Stuff</Container>
    </div>
  );
};

export default inject('userStore')(observer(Home));
