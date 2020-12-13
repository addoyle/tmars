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
    className={classnames('player inline-flex center-items', {
      active: props.active,
      passed: props.player.passed,
      disabled: props.disabled
    })}
    onClick={props.onClick}
    onMouseDown={e => e.stopPropagation()}
    onMouseMove={e => e.stopPropagation()}
  >
    <Resource name={`player-${props.pid}`} />
    {props.tr ? (
      <div
        className={classnames('points', {
          o: props.player.tr % 5 !== 0
        })}
      >
        <span className="value">{props.player.tr}</span>
      </div>
    ) : null}
    <span>{props.player.name}</span>

    {props.starting ? <span className="starting-player" /> : null}
    {props.children ? (
      <div className="player-icon resources">{props.children}</div>
    ) : null}
  </div>
);

Player.defaultProps = {
  tr: true
};

Player.propTypes = {
  active: PropTypes.bool,
  starting: PropTypes.bool,
  player: PropTypes.shape({
    passed: PropTypes.bool,
    name: PropTypes.string.isRequired,
    tr: PropTypes.number
  }).isRequired,
  disabled: PropTypes.bool,
  pid: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  tr: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Player;
