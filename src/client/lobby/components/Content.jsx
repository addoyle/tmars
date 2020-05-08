import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3)
  }
}));

const Content = props => {
  const classes = useStyles();

  return <div className={classes.container}>{props.children}</div>;
};

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Content;
