import React from 'react';
import './assets/Assets.scss';

export default function Production(props) {
  return (
    <div className="production">{props.children}</div>
  );
}
