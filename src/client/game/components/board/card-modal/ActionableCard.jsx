import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tooltip } from '@material-ui/core';
import classnames from 'classnames';
import { Resource, MegaCredit, Production } from '../../assets/Assets';
import { toJS } from 'mobx';
import { isPlainObject } from 'lodash';

// Render the icon
const renderIcon = origIcon => {
  if (!origIcon) {
    return <span />;
  }

  const icons = Array.isArray(origIcon) ? origIcon : [origIcon];

  return (
    <div className="resources">
      {icons.map((icon, i) => {
        if (icon?.player) {
          return <Resource key={i} name={`player-${icon.player}`} />;
        } else if (icon?.megacredit) {
          return <MegaCredit key={i} value={icon.megacredit} />;
        } else if (icon?.resource) {
          return <Resource key={i} name={icon.resource} />;
        } else if (icon?.production) {
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
        } else if (icon?.text) {
          return <span key={i}>{`${icon.text}`}</span>;
        } else {
          return <span key={i}>{icon}</span>;
        }
      })}
    </div>
  );
};

const ActionableCard = ({ gameStore, card }) => {
  const currentCard = gameStore.ui.currentCard;
  const player = gameStore.player;
  const actions = card?.actions || toJS(currentCard?.actions) || [];

  return (
    <>
      {actions?.map((action, i) => {
        const [count, setCount] = useState(0);
        const targetPlayer = action.targetPlayer
          ? gameStore.players[action.targetPlayer - 1]
          : player;

        const valid = action.canPlay
          ? action.canPlay(targetPlayer, gameStore, count)
          : { valid: true, msg: [] };
        card?.actionPlayable(action, targetPlayer, gameStore, valid);
        console.log(valid);

        return (
          <div key={`${card?.number}-${i}`}>
            <Tooltip
              title={valid?.msg.length ? valid.msg.join('\n') : ''}
              arrow
              placement="top"
            >
              <button
                className={classnames({
                  disabled: !valid?.valid
                })}
                onClick={() => {
                  if (valid?.valid) {
                    gameStore.cardAction(
                      currentCard,
                      i,
                      action.counter ? count : null
                    );
                    currentCard.show = false;
                  }
                }}
              >
                <div className="flex">
                  <div className="resources middle">
                    {action.counter
                      ? action.counter.resultIcon(count, player, gameStore)
                      : isPlainObject(action.icon)
                      ? renderIcon(action.icon)
                      : action.icon}
                  </div>
                  <div className="center middle">{action.name}</div>
                  {action.counter ? (
                    <div className="resources middle">{action.icon}</div>
                  ) : null}
                  {action.rightIcon ? (
                    <div className="right middle">
                      {isPlainObject(action.icon)
                        ? renderIcon(action.rightIcon)
                        : action.rightIcon}
                    </div>
                  ) : null}
                </div>
              </button>
            </Tooltip>

            {action.counter ? (
              <button
                className="text-center"
                onClick={() => {
                  setCount(
                    count >= action.counter.max(player, gameStore)
                      ? 0
                      : count + 1
                  );
                }}
              >
                <div className="flex">
                  <div className="resources middle">{action.counter.icon}</div>
                  <div className="center middle">{action.counter.name}</div>
                  <div className="pill middle">
                    ({count}/{action.counter.max(player, gameStore)})
                  </div>
                </div>
              </button>
            ) : null}
          </div>
        );
      })}

      {!currentCard.isPrompt ? (
        <button
          className="text-center col-1"
          onClick={() => gameStore.hideCurrentCard()}
        >
          Cancel
        </button>
      ) : currentCard.optional ? (
        <button
          className="text-center col-1"
          onClick={() => gameStore.cardAction(currentCard, null)}
        >
          Cancel
        </button>
      ) : null}
    </>
  );
};

ActionableCard.propTypes = {
  gameStore: PropTypes.shape({
    ui: PropTypes.shape({
      currentCard: PropTypes.shape({
        card: PropTypes.object,
        show: PropTypes.bool,
        actions: PropTypes.array,
        isPrompt: PropTypes.bool,
        optional: PropTypes.bool
      }).isRequired
    }),
    cardAction: PropTypes.func,
    player: PropTypes.object,
    players: PropTypes.array,
    hideCurrentCard: PropTypes.func
  }),
  card: PropTypes.shape({
    number: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.node,
        counter: PropTypes.shape({
          max: PropTypes.func,
          icon: PropTypes.node,
          name: PropTypes.string,
          resultIcon: PropTypes.func
        })
      })
    ),
    actionPlayable: PropTypes.func
  })
};

export default inject('gameStore')(observer(ActionableCard));
