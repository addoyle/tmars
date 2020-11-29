import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tag } from './Assets';

/**
 * Resource
 *
 * @prop name   Resource type (e.g. Plant, Steel, etc.)
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
const Resource = ({ name, anyone, tag }) => (
  <div className={classNames('icon', 'resource', name, { anyone })}>
    {tag ? <Tag name={tag} /> : null}
  </div>
);

Resource.propTypes = {
  name: PropTypes.string,
  tag: PropTypes.string,
  anyone: PropTypes.bool
};

export default Resource;
