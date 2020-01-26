import React from 'react';
import './Assets.scss';
import classNames from 'classnames';

/**
 * Resource
 *
 * @prop name   Resource type (e.g. Plant, Steel, etc.)
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
export default function Resource(props) {
  return (
    <div className={classNames('icon', 'resource', props.name, { anyone: props.anyone })} />
  );
}
