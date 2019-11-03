import React from 'react';
import './Assets.scss';

/**
 * Wraps components in a Victory Point bubble
 */
export default function VictoryPoint(props) {
  return (
    <div className={`vp ${props.anyone ? 'anyone' : ''}`}>{props.children}</div>
  );
}
