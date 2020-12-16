import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './PlayerPicker.scss';
import Player from './Player';
import { MegaCredit, Production, Resource } from '../../assets/Assets';
import classNames from 'classnames';
import { toJS } from 'mobx';

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
    (icon?.production &&
      !(
        player?.production[icon.production] > 0 ||
        (icon.production === 'megacredit' && player?.production.megacredit > -5)
      ));

  return (
    <div
      className={classNames('player-picker', {
        show:
          gameStore.playerStatus?.type === 'prompt-player' &&
          gameStore.turn === gameStore.player?.number
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <h1>Pick a Player</h1>
      <ul className="player-list">
        {gameStore.players.map(p => {
          const player = toJS(p);
          // Don't disable passed players
          player.passed = false;

          return (
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
                      {icon.production === 'megacredit' ? (
                        <MegaCredit value={player.production.megacredit} />
                      ) : (
                        <>
                          <div className="col-1 text-center">
                            <span>{player.production[icon.production]}</span>
                          </div>
                          <Resource name={icon.production} />
                        </>
                      )}
                    </div>
                  </Production>
                ) : icon?.resources ? (
                  icon.resources === 'megacredit' ? (
                    <MegaCredit value={player.resources.megacredit} />
                  ) : (
                    <>
                      <span>{player.resources[icon.resources]}</span>
                      <Resource name={icon.resources} />
                    </>
                  )
                ) : null}
              </Player>
            </li>
          );
        })}
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
    player: PropTypes.shape({
      number: PropTypes.number
    }),
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
    pickPlayer: PropTypes.func,
    turn: PropTypes.number
  })
};

export default inject('gameStore')(observer(PlayerPicker));
