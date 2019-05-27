import React from 'react';
import './Assets.scss';

export default function VictoryPoint(props) {
  return (
    <div className="icon vp mars" data-point={props.point} />
  );
}
