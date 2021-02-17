import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './ChoicePicker.scss';
import { MegaCredit, Production, Resource } from '../../assets/Assets';
import classNames from 'classnames';
import { toJS } from 'mobx';

/**
 * Render the tiles portion of the player stats
 *
 * @param {*} props
 */
const ChoicePicker = ({ gameStore }) => {
  console.log(toJS(gameStore.playerStatus));

  const playerStatus = gameStore.playerStatus;

  // const icon = playerStatus?.icon;
  // TODO: Handle protected habitats

  const disabled = () => false;
  // player =>
  //   !gameStore.playerStatus?.validPlayers?.includes(player.number) ||
  //   (icon?.resources && player?.resources[icon.resources] <= 0) ||
  //   (icon?.production &&
  //     !(
  //       player?.production[icon.production] > 0 ||
  //       (icon.production === 'megacredit' && player?.production.megacredit > -5)
  //     ));

  return (
    <div
      className={classNames('choice-picker', {
        show:
          playerStatus?.type === 'prompt' &&
          gameStore.turn === gameStore.player?.number
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <h1>{gameStore.playerStatus?.desc}</h1>
      <ul className="choice-list">
        {playerStatus?.choices.map((choice, i) => {
          // const player = toJS(p);
          // Don't disable passed players
          // player.passed = false;

          return (
            <li key={i}>
              <button
                // pid={player.number}
                // player={player}
                // tr={false}
                onClick={() =>
                  !disabled(choice) && gameStore.pickChoice(choice.number)
                }
                disabled={disabled(choice)}
              >
                {choice.icon?.production ? (
                  <Production>
                    <div className="flex">
                      {choice.icon.production === 'megacredit' ? (
                        <MegaCredit value={1} />
                      ) : (
                        <Resource name={choice.icon.production} />
                      )}
                    </div>
                  </Production>
                ) : choice.icon?.resource ? (
                  choice.icon.resource === 'megacredit' ? (
                    <MegaCredit value={1} />
                  ) : (
                    <Resource name={choice.icon.resource} />
                  )
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      {gameStore.playerStatus?.optional ? (
        <div className="footer">
          <button onClick={() => gameStore.pickChoice(null)}>Cancel</button>
        </div>
      ) : null}
    </div>
  );
};

ChoicePicker.propTypes = {
  gameStore: PropTypes.shape({
    player: PropTypes.shape({
      number: PropTypes.number
    }),
    playerStatus: PropTypes.shape({
      type: PropTypes.string,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number,
          canPlay: PropTypes.bool,
          icon: PropTypes.oneOfType([
            PropTypes.arrayOf(
              PropTypes.oneOfType([
                PropTypes.shape({
                  production: PropTypes.string,
                  resource: PropTypes.string
                }),
                PropTypes.string
              ])
            ),
            PropTypes.shape({
              production: PropTypes.string,
              resource: PropTypes.string
            })
          ])
        })
      ),
      desc: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      optional: PropTypes.bool
    }),
    pickChoice: PropTypes.func,
    turn: PropTypes.number
  })
};

export default inject('gameStore')(observer(ChoicePicker));
