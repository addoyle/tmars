import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './ChoicePicker.scss';
import { MegaCredit, Production, Resource } from '../../assets/Assets';
import classNames from 'classnames';

/**
 * Render the tiles portion of the player stats
 *
 * @param {*} props
 */
const ChoicePicker = ({ gameStore }) => {
  const playerStatus = gameStore.playerStatus;

  // Render the icon
  const renderIcon = origIcon => {
    const icons = Array.isArray(origIcon) ? origIcon : [origIcon];

    return (
      <div className="resources">
        {icons.map((icon, i) => {
          if (icon.player) {
            return <Resource key={i} name={`player-${icon.player}`} />;
          } else if (icon.megacredit) {
            return <MegaCredit key={i} value={icon.megacredit} />;
          } else if (icon.resource) {
            return <Resource key={i} name={icon.resource} />;
          } else if (icon.production) {
            return (
              <Production key={i}>
                <div className="flex">
                  {icon.production === 'megacredit' ? (
                    <MegaCredit value={icon.value} />
                  ) : (
                    <>
                      {icon.value !== null ? <span>{icon.value}</span> : null}
                      <Resource name={icon.production} />
                    </>
                  )}
                </div>
              </Production>
            );
          } else if (icon.text !== null) {
            return <span key={i}>{`${icon.text}`}</span>;
          }
        })}
      </div>
    );
  };

  return (
    <div
      className={classNames('choice-picker', {
        show:
          playerStatus?.type === 'prompt-choice' &&
          gameStore.turn === gameStore.player?.number
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <h1>{playerStatus?.desc}</h1>
      <ul className="choice-list">
        {playerStatus?.choices?.map((choice, i) => (
          <li key={i}>
            <button
              className="flex"
              onClick={() => !choice?.disabled && gameStore.pickChoice(i)}
              disabled={choice?.disabled}
            >
              <div className="left middle">{renderIcon(choice.icon)}</div>
              <div className="center middle">{choice.label}</div>
              <div className="right middle">{renderIcon(choice.rightIcon)}</div>
            </button>
          </li>
        ))}
      </ul>
      {gameStore.playerStatus?.optional ? (
        <div className="footer">
          <button onClick={() => gameStore.pickChoice(null)}>Cancel</button>
        </div>
      ) : null}
    </div>
  );
};

const icon = PropTypes.oneOfType([
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
]);
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
          icon,
          rightIcon: icon
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
