import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './Players.scss';
import Player from './Player';
import PlayerStats from './PlayerStats';
import classNames from 'classnames';

/**
 * Shows a list of players on the top left
 */
const Players = ({ gameStore }) =>
  gameStore.players.length ? (
    <div className="players">
      <div
        className={classNames(
          'player-selector',
          `player-${gameStore.playerStats.pid}`,
          {
            active: gameStore.playerStats.pid === +gameStore.turn,
            hidden: !gameStore.playerStats.show
          }
        )}
      />

      <ul>
        {gameStore.players.map((player, i) => (
          <li key={`player-stats-${i}`}>
            <Player
              pid={i + 1}
              player={player}
              active={i + 1 === +gameStore.turn}
              starting={i + 1 === +gameStore.startingPlayer}
              onClick={() =>
                gameStore.playerStats.show &&
                gameStore.playerStats.pid === i + 1
                  ? (gameStore.playerStats.show = false)
                  : gameStore.showPlayerStats(i + 1, player)
              }
            />
          </li>
        ))}
      </ul>

      <PlayerStats />
    </div>
  ) : null;

Players.propTypes = {
  gameStore: PropTypes.shape({
    players: PropTypes.array,
    playerStats: PlayerStats.propTypes,
    showPlayerStats: PropTypes.func,
    turn: PropTypes.number,
    startingPlayer: PropTypes.number
  })
};

export default inject('gameStore', 'gameStore')(observer(Players));
