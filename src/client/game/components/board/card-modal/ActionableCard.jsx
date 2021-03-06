import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tooltip } from '@material-ui/core';
import classnames from 'classnames';
import { Resource, MegaCredit, Production } from '../../assets/Assets';
import { isPlainObject } from 'lodash';

// Render the icon
const renderIcon = origIcon =>
  origIcon ? (
    (Array.isArray(origIcon) ? origIcon : [origIcon]).map((icon, i) =>
      icon?.player ? (
        <Resource key={i} name={`player-${icon.player}`} />
      ) : icon?.megacredit ? (
        <MegaCredit key={i} value={icon.megacredit} anyone={icon.anyone} />
      ) : icon?.resource ? (
        <Resource key={i} name={icon.resource} anyone={icon.anyone} />
      ) : icon?.production ? (
        <Production key={i}>
          <div className="flex">
            {icon.production === 'megacredit' ? (
              <MegaCredit value={icon.value} anyone={icon.anyone} />
            ) : (
              <>
                {icon.value !== null ? <span>{icon.value}</span> : null}
                <Resource name={icon.production} anyone={icon.anyone} />
              </>
            )}
          </div>
        </Production>
      ) : icon?.text ? (
        <span key={i}>{`${icon.text}`}</span>
      ) : (
        <React.Fragment key={i}>{icon}</React.Fragment>
      )
    )
  ) : (
    <span />
  );

const ActionableCard = ({ gameStore, cardStore, card }) => {
  const currentCard = gameStore.ui.currentCard;
  const player = gameStore.player;
  const actions = currentCard?.actions || card?.actions || [];

  const [theCount, doSetCount] = useState([]);
  const count = i => theCount[i] ?? 0;
  const setCount = (i, c) => {
    theCount[i] = c;
    doSetCount([...theCount]);
  };

  return (
    <>
      {actions?.map((action, i) => {
        const targetPlayer = action.targetPlayer
          ? gameStore.players[action.targetPlayer - 1]
          : player;

        const valid = action.canPlay
          ? action.canPlay(targetPlayer, gameStore, cardStore, count(i))
          : { valid: true, msg: [] };
        gameStore?.actionPlayable(action, targetPlayer, cardStore, valid);

        return (
          <div key={`${card?.number}-${i}`}>
            <Tooltip
              title={
                valid?.msg?.length
                  ? Array.isArray(valid.msg)
                    ? valid.msg.join('\n')
                    : valid.msg
                  : ''
              }
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
                      action.counter ? count(i) : null
                    );
                    gameStore.hideCurrentCard();
                  }
                }}
              >
                <div className="flex">
                  <div className="resources middle">
                    {action.counter
                      ? action.counter.resultIcon(count(i), player, gameStore)
                      : renderIcon(action.icon)}
                  </div>
                  <div className="center middle">{action.name}</div>
                  {action.counter ? (
                    <div className="resources middle">{action.icon}</div>
                  ) : null}
                  {action.rightIcon ? (
                    <div className="right resources middle">
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
                    i,
                    count(i) >= action.counter.max(player, gameStore)
                      ? 0
                      : count(i) + 1
                  );
                }}
              >
                <div className="flex">
                  <div className="resources middle">{action.counter.icon}</div>
                  <div className="center middle">{action.counter.name}</div>
                  <div className="pill middle">
                    ({count(i)}/{action.counter.max(player, gameStore)})
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
    hideCurrentCard: PropTypes.func,
    actionPlayable: PropTypes.func
  }),
  cardStore: PropTypes.shape({
    get: PropTypes.func
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
    )
  })
};

export default inject('gameStore', 'cardStore')(observer(ActionableCard));
