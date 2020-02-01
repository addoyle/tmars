import React from 'react';
import { inject, observer } from 'mobx-react';
import './Ocean.scss';
import { Tile } from '../../assets/Assets';
import classNames from 'classnames';

export default inject('boardStore')(observer(props => 
  <div className={classNames('ocean-param', { maxed: props.boardStore.params.ocean === 0 })}>
    <Tile name="ocean">
      <div className="ocean-num">
        {props.boardStore.params.ocean}
      </div>
    </Tile>
  </div>
));