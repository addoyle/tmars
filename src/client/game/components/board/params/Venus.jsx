import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './Venus.scss';
import { Param } from '../../assets/Assets';
import Gauge from './Gauge';

const Venus = props => (
  <Gauge
    name="venus"
    min={0}
    max={30}
    step={2}
    value={props.gameStore.params.venus}
    renderValue={val => `${val}%`}
    icon={<Param name="venus" />}
    bonuses={[
      { threshold: 8, param: 'card back' },
      { threshold: 16, resource: 'tr' }
    ]}
  />
);

Venus.propTypes = {
  gameStore: PropTypes.shape({
    params: PropTypes.shape({
      venus: PropTypes.number
    })
  }).isRequired
};

export default inject('gameStore')(observer(Venus));
