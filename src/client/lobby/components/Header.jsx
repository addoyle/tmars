import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TERRAFORMING MARS
          </Typography>
          {props.userStore.name ? (
            <IconButton color="inherit">
              <FontAwesomeIcon icon="user-circle" />
            </IconButton>
          ) : (
            <div>SIGN IN WITH GOOGLE</div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

Header.propTypes = {
  userStore: PropTypes.shape({
    name: PropTypes.string
  })
};

export default inject('userStore')(observer(Header));
