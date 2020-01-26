import React from 'react';
import './Assets.scss';
import classNames from 'classnames';

/**
 * Tag
 *
 * @prop name   Tag type (e.g. Science, space etc.)
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
export default function Tag(props) {
  return (
    <div className={classNames('icon', 'tag', props.name, { anyone: props.anyone })} />
  );
}
