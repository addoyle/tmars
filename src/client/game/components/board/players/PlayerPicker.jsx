import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './PlayerPicker.scss';
import Player from './Player';
import { Production, Resource } from '../../assets/Assets';
import classNames from 'classnames';

/**
 * Render the tiles portion of the player stats
 *
 * @param {*} props
 */
const PlayerPicker = ({ gameStore }) => {
  const icon = gameStore.playerStatus?.icon;
  // TODO: Handle protected habitats
  const disabled = player =>
    (icon?.resources && player?.resources[icon.resources] <= 0) ||
    (icon?.production && player?.production[icon.production] <= 0);

  return (
    <div
      className={classNames('player-picker', {
        show: gameStore.playerStatus?.type === 'prompt-player'
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <h1>Pick a Player</h1>
      <ul className="player-list">
        {gameStore.players.map(player => (
          <li key={player.number}>
            <Player
              pid={player.number}
              player={player}
              tr={false}
              onClick={() =>
                !disabled(player) && gameStore.pickPlayer(player.number)
              }
              disabled={disabled(player)}
            >
              {icon?.production ? (
                <Production>
                  <div className="flex">
                    <div className="col-1 text-center">
                      <span>{player.production[icon.production]}</span>
                    </div>
                    <Resource name={icon.production} />
                  </div>
                </Production>
              ) : icon?.resources ? (
                <>
                  <span>{player.resources[icon.resources]}</span>
                  <Resource name={icon.resources} />
                </>
              ) : null}
            </Player>
          </li>
        ))}
      </ul>
      {icon?.resources ? (
        <div className="footer">
          <button onClick={() => gameStore.pickPlayer(null)}>Cancel</button>
        </div>
      ) : null}
    </div>
  );
};

PlayerPicker.propTypes = {
  gameStore: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.number
      })
    ),
    playerStatus: PropTypes.shape({
      icon: PropTypes.shape({
        production: PropTypes.string,
        resources: PropTypes.string
      }),
      type: PropTypes.string
    }),
    pickPlayer: PropTypes.func
  })
};

export default inject('gameStore')(observer(PlayerPicker));
