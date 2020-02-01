import React from 'react';
import { observer, inject } from 'mobx-react';
import './Temperature.scss';
import { Param, Tile, Resource, Production } from '../../assets/Assets';
import classNames from 'classnames';
import { gauge } from './util';

export default inject('boardStore')(observer(props => 
  <div className={classNames('col-1', 'temp-wrapper', 'flex', { maxed: props.boardStore.params.temp === 8 })}>
    <Param name="temperature" />
    <div className="temp-gauge bottom" style={{height: `${gauge(props.max, props.boardStore.params.temp + 30, 9)}px`}}>
      <span>{`${props.boardStore.params.temp > 0 ? '+' : ''}${props.boardStore.params.temp}°C`}</span>
    </div>

    <div className={classNames('bonus', 'heat', { met: props.boardStore.params.temp >= -24 })} style={{top: `${gauge(props.max, -24 + 30, 0, true)}px`}} data-content="-24">
      <Production>
        <div className="flex">
          <Resource name="heat" />
        </div>
      </Production>
    </div>

    <div className={classNames('bonus', 'heat', { met: props.boardStore.params.temp >= -20 })} style={{top: `${gauge(props.max, -20 + 30, 0, true)}px`}} data-content="-20">
      <Production>
        <div className="flex">
          <Resource name="heat" />
        </div>
      </Production>
    </div>

    <div className={classNames('bonus', { met: props.boardStore.params.temp >= 0 })} style={{top: `${gauge(props.max, 0 + 30, 0, true)}px`}} data-content="0°C">
      <Tile name="ocean" />
    </div>

    {new Array(props.max / 2).fill(undefined).map((v,i) => (
      <span key={i} className="tick" style={{top: `${gauge(props.max, i * 2, 0, true)}px`}} />
    ))}
  </div>
));