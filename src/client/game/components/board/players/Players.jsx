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
          `player-${gameStore.ui.playerStats.pid}`,
          {
            active: gameStore.ui.playerStats.pid === +gameStore.turn,
            hidden: !gameStore.ui.playerStats.show
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
                gameStore.ui.playerStats.show &&
                gameStore.ui.playerStats.pid === i + 1
                  ? (gameStore.ui.playerStats.show = false)
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
    ui: PropTypes.shape({
      playerStats: PlayerStats.propTypes
    }),
    showPlayerStats: PropTypes.func,
    turn: PropTypes.number,
    startingPlayer: PropTypes.number
  })
};

export default inject('gameStore', 'gameStore')(observer(Players));
