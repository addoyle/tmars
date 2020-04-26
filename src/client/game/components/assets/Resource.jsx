import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Resource
 *
 * @prop name   Resource type (e.g. Plant, Steel, etc.)
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
const Resource = ({ name, anyone }) => (
  <div className={classNames('icon', 'resource', name, { anyone })} />
);

Resource.propTypes = {
  name: PropTypes.string,
  anyone: PropTypes.bool
};

export default Resource;
