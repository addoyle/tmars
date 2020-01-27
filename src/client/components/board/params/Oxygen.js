import React from 'react';
import './Oxygen.scss';
import { Param } from '../../assets/Assets';
import classNames from 'classnames';
import { gauge } from './util';

export default function Oxygen(props) {
  return <div className={classNames('col-1', 'oxy-wrapper', 'flex', { maxed: props.value === props.max })}>
    <Param name="oxygen" />
    <div className="oxy-gauge bottom" style={{height: `${gauge(props.max, props.value, 9)}px`}}>
      <span>{`${props.value}%`}</span>
    </div>

    <div className={classNames('bonus', { met: props.value >= 8 })} style={{top: `${gauge(props.max, 8, 0, true)}px`}} data-content="8%">
      <Param name="temperature" />
    </div>

    {new Array(props.max).fill(undefined).map((v,i) => (
      <span key={i} className="tick" style={{top: `${gauge(props.max, i, 0, true)}px`}} />
    ))}
  </div>;
}