import React from 'react';
import './Assets.scss';
import classNames from 'classnames';

/**
 * Wraps components in a Victory Point bubble
 */
export default function VictoryPoint(props) {
  return (
    <div className={classNames('vp', { anyone: props.anyone })}>{props.children}</div>
  );
}
