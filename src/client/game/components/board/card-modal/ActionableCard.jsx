import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tooltip } from '@material-ui/core';
import classnames from 'classnames';

const ActionableCard = ({ gameStore, card }) => {
  const currentCard = gameStore.ui.currentCard;
  const player = gameStore.player;

  return (
    <>
      {card.actions?.map((action, i) => {
        const [count, setCount] = useState(0);

        const valid = action.canPlay
          ? action.canPlay(gameStore.player, gameStore, count)
          : { valid: true };

        return (
          <div key={`${card.number}-${i}`}>
            <Tooltip title={valid?.msg || ''} arrow placement="top">
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
                      : action.icon}
                  </div>
                  <div className="center middle">{action.name}</div>
                  {action.counter ? (
                    <div className="resources middle">{action.icon}</div>
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

      <button
        className="text-center col-1"
        onClick={() => (currentCard.show = false)}
      >
        Cancel
      </button>
    </>
  );
};

ActionableCard.propTypes = {
  gameStore: PropTypes.shape({
    ui: PropTypes.shape({
      currentCard: PropTypes.shape({
        card: PropTypes.object,
        show: PropTypes.bool
      }).isRequired
    }),
    cardAction: PropTypes.func,
    player: PropTypes.object
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

export default inject('gameStore')(observer(ActionableCard));
