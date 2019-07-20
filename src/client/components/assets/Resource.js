import React from 'react';
import './Assets.scss';

/**
 * Resource
 *
 * @prop name   Resource type (e.g. Plant, Steel, etc.)
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
export default function Resource(props) {
  return (
    <div className={`icon resource ${props.name} ${props.anyone ? 'anyone' : ''}`} />
  );
}
