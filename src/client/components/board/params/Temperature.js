import React from 'react';
import './Temperature.scss';
import { Param, Tile, Resource, Production } from '../../assets/Assets';
import classNames from 'classnames';
import { gauge } from './util';

export default function Temperature(props) {
  return <div className={classNames('col-1', 'temp-wrapper', 'flex', { maxed: props.value === 8 })}>
    <Param name="temperature" />
    <div className="temp-gauge bottom" style={{height: `${gauge(props.max, props.value + 30, 9)}px`}}>
      <span>{`${props.value > 0 ? '+' : ''}${props.value}°C`}</span>
    </div>

    <div className={classNames('bonus', 'heat', { met: props.value >= -24 })} style={{top: `${gauge(props.max, -24 + 30, 0, true)}px`}} data-content="-24">
      <Production>
        <div className="flex">
          <Resource name="heat" />
        </div>
      </Production>
    </div>

    <div className={classNames('bonus', 'heat', { met: props.value >= -20 })} style={{top: `${gauge(props.max, -20 + 30, 0, true)}px`}} data-content="-20">
      <Production>
        <div className="flex">
          <Resource name="heat" />
        </div>
      </Production>
    </div>

    <div className={classNames('bonus', { met: props.value >= 0 })} style={{top: `${gauge(props.max, 0 + 30, 0, true)}px`}} data-content="0°C">
      <Tile name="ocean" />
    </div>

    {new Array(props.max / 2).fill(undefined).map((v,i) => (
      <span key={i} className="tick" style={{top: `${gauge(props.max, i * 2, 0, true)}px`}} />
    ))}
  </div>;
}