import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { observer, inject } from 'mobx-react';
import ActiveGames from '../components/ActiveGames';
import PublicGames from '../components/PublicGames';

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(2)
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className="home">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Paper className={classes.section}>
              <PublicGames />
            </Paper>
          </Grid>

          <Grid item sm={6} className={classes.section}>
            <Paper className={classes.section}>
              <ActiveGames />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default inject('userStore')(observer(Home));
