import React from 'react';
import './Assets.scss';

/**
 * Tag
 *
 * @prop name   Tag type (e.g. Science, space etc.)
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
export default function Tag(props) {
  return (
    <div className={`icon tag ${props.name} ${props.anyone ? 'anyone' : ''}`} />
  );
}
