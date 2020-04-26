import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './GlobalParameters.scss';
import classNames from 'classnames';
import Ocean from './Ocean';
import Oxygen from './Oxygen';
import Temperature from './Temperature';

/**
 * Shows the global parameters
 */
const GlobalParameters = props => {
  const gen = props.gameStore.params.generation;

  return (
    <div className="global-params">
      <div className={classNames('points', { o: gen % 5 !== 0 })}>
        <span className="value">{gen}</span>
      </div>

      <div className="flex">
        <Oxygen />
        <Temperature />
      </div>

      <Ocean />
    </div>
  );
};

GlobalParameters.propTypes = {
  gameStore: PropTypes.shape({
    params: PropTypes.shape({
      generation: PropTypes.number
    })
  })
};

export default inject('gameStore')(observer(GlobalParameters));
