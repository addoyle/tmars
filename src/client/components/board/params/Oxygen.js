import React from 'react';
import { observer, inject } from 'mobx-react';
import './Oxygen.scss';
import { Param } from '../../assets/Assets';
import classNames from 'classnames';
import { gauge } from './util';

export default inject('boardStore')(observer(props => 
  <div className={classNames('col-1', 'oxy-wrapper', 'flex', { maxed: props.boardStore.params.oxygen === props.max })}>
    <Param name="oxygen" />
    <div className="oxy-gauge bottom" style={{height: `${gauge(props.max, props.boardStore.params.oxygen, 9)}px`}}>
      <span>{`${props.boardStore.params.oxygen}%`}</span>
    </div>

    <div className={classNames('bonus', { met: props.boardStore.params.oxygen >= 8 })} style={{top: `${gauge(props.max, 8, 0, true)}px`}} data-content="8%">
      <Param name="temperature" />
    </div>

    {new Array(props.max).fill(undefined).map((v,i) => (
      <span key={i} className="tick" style={{top: `${gauge(props.max, i, 0, true)}px`}} />
    ))}
  </div>
));