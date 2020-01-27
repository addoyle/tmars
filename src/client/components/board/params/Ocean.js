import React from 'react';
import './Ocean.scss';
import { Tile } from '../../assets/Assets';
import classNames from 'classnames';

export default function Ocean(props) {
  return <div className={classNames('ocean-param', { maxed: props.value === 0 })}>
    <Tile name="ocean">
      <div className="ocean-num">
        {props.value}
      </div>
    </Tile>
  </div>;
}