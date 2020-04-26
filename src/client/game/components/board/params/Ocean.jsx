import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './Ocean.scss';
import { Tile } from '../../assets/Assets';
import classNames from 'classnames';

const Ocean = props => {
  const ocean = props.gameStore.params.ocean;

  return (
    <div className={classNames('ocean-param', { maxed: ocean === 0 })}>
      <Tile name="ocean">
        <div className="ocean-num">{ocean}</div>
      </Tile>
    </div>
  );
};

Ocean.propTypes = {
  gameStore: PropTypes.shape({
    params: PropTypes.shape({
      ocean: PropTypes.number
    })
  }).isRequired
};

export default inject('gameStore')(observer(Ocean));
