import React from 'react';
import './Assets.scss';

export default function Tag(props) {
  return (
    <div className={`icon resource ${props.name} ${props.anyone ? 'anyone' : ''}`} />
  );
}
