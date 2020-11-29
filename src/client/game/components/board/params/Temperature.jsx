import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './Temperature.scss';
import { Param } from '../../assets/Assets';
import Gauge from './Gauge';

const Temperature = props => (
  <Gauge
    name="temperature"
    min={-30}
    max={8}
    step={2}
    value={props.gameStore.params.temperature}
    renderValue={val => `${val > 0 ? '+' : null}${val}°C`}
    icon={<Param name="temperature" />}
    bonuses={[
      { production: 'heat', threshold: -24, content: '-24' },
      { production: 'heat', threshold: -20, content: '-20' },
      { tile: 'ocean', threshold: 0 }
    ]}
  />
);

Temperature.propTypes = {
  gameStore: PropTypes.shape({
    params: PropTypes.shape({
      temperature: PropTypes.number
    })
  }).isRequired
};

export default inject('gameStore')(observer(Temperature));
