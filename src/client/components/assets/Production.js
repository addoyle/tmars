import React from 'react';
import './Assets.scss';

/**
 * Wraps components inside a Production box
 */
export default function Production(props) {
  return (
    <div className="production">{props.children}</div>
  );
}
