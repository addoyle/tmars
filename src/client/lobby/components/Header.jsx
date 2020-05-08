import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    fontFamily: 'Prototype',
    letterSpacing: '.2em',
    textShadow: '.1em .25em .15em rgba(0,0,0,.4)'
  },
  google: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#4285f4',
    borderRadius: 3,
    boxShadow: '0 1px 1px rgba(0,0,0,.4)',
    paddingRight: theme.spacing(2),
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textDecoration: 'none',
    '&:before': {
      content: "''",
      marginRight: theme.spacing(1),
      display: 'inline-block',
      height: '46px',
      width: '46px',
      margin: -3,
      background: "url('./icons/google.svg') center no-repeat",
      verticalAlign: 'middle'
    }
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TERRAFORMING MARS
          </Typography>
          {props.userStore.name ? (
            <IconButton color="inherit">
              <FontAwesomeIcon icon="user-circle" />
            </IconButton>
          ) : (
            <a href="#" className={classes.google}>
              Sign in with Google
            </a>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  userStore: PropTypes.shape({
    name: PropTypes.string
  })
};

export default inject('userStore')(observer(Header));
