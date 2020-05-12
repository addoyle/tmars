import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Tag
 *
 * @prop name   Tag type (e.g. Science, space etc.)
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
const Tag = ({ name, anyone, style }) => (
  <div className={classNames('icon', 'tag', name, { anyone })} style={style} />
);

Tag.propTypes = {
  name: PropTypes.string,
  anyone: PropTypes.bool,
  style: PropTypes.object
};

export default Tag;
