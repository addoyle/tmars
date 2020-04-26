import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wraps components inside a Production box
 */
const Production = props => <div className="production">{props.children}</div>;

Production.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Production;
