import React from 'react';
import PropTypes from 'prop-types';
import './Player.scss';
import { Resource } from '../../assets/Assets';
import classnames from 'classnames';

/**
 * A single player from the player list
 */
const Player = props => (
  <div
    className={classnames('player', {
      active: props.active,
      passed: props.player.passed
    })}
    onClick={props.onClick}
    onMouseDown={e => e.stopPropagation()}
    onMouseMove={e => e.stopPropagation()}
  >
    <Resource name={`player-${props.pid}`} />
    <div
      className={classnames('points', {
        o: props.player.tr % 5 !== 0
      })}
    >
      <span className="value">{props.player.tr}</span>
    </div>
    <span>{props.player.name}</span>

    {props.starting ? <span className="starting-player" /> : null}
  </div>
);

Player.propTypes = {
  active: PropTypes.bool,
  starting: PropTypes.bool,
  player: PropTypes.shape({
    passed: PropTypes.bool,
    name: PropTypes.string.isRequired,
    tr: PropTypes.number
  }).isRequired,
  pid: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Player;
