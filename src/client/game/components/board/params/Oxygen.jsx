import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './Oxygen.scss';
import { Param } from '../../assets/Assets';
import Gauge from './Gauge';

const Oxygen = props => (
  <Gauge
    name="oxygen"
    min={0}
    max={14}
    value={props.gameStore.params.oxygen}
    renderValue={val => `${val}%`}
    icon={<Param name="oxygen" />}
    bonuses={[{ threshold: 8, param: 'temperature' }]}
  />
);

Oxygen.propTypes = {
  gameStore: PropTypes.shape({
    params: PropTypes.shape({
      oxygen: PropTypes.number
    })
  }).isRequired
};

export default inject('gameStore')(observer(Oxygen));
