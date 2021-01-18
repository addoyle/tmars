import React from 'react';
import Typography from '@material-ui/core/Typography';
import { observer, inject } from 'mobx-react';

const CreateGame = () => {
  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Public Games
      </Typography>
    </>
  );
};

export default inject('userStore')(observer(CreateGame));
