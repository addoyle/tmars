import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Wraps components in a Victory Point bubble
 */
const VictoryPoint = ({ anyone, children }) => (
  <div className={classNames('vp', { anyone })}>{children}</div>
);

VictoryPoint.propTypes = {
  anyone: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default VictoryPoint;
