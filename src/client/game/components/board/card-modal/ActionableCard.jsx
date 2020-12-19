import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tooltip } from '@material-ui/core';
import { MegaCredit, Resource } from '../../assets/Assets';
import classnames from 'classnames';
import { capitalize } from 'lodash';

const ActionableCard = ({ gameStore, card }) => {
  const currentCard = gameStore.currentCard;
  const player = gameStore.player;

  return (
    <>
      {card.actions?.map((action, i) => {
        const valid = action.canPlay
          ? action.canPlay(gameStore.player, gameStore)
          : { valid: true };

        // Maximum of the optional resource that can be used
        const maxResource =
          action.opts?.resource &&
          Math.min(
            Math.ceil(action.opts?.cost / player?.rates[action.opts?.resource]),
            player?.resources[action.opts?.resource]
          );

        const [resource, setResource] = useState(0);

        return (
          <div key={i}>
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
                      // Opts object from used resources
                      action.opts?.resource
                        ? { [action.opts.resource]: resource }
                        : null
                    );
                    currentCard.show = false;
                  }
                }}
              >
                <div className="flex">
                  <div className="resources middle">
                    {action.opts?.resource ? (
                      <>
                        <MegaCredit
                          value={
                            action.opts.cost -
                            resource * player?.rates[action.opts?.resource]
                          }
                        />
                        <span className="arrow" />
                      </>
                    ) : null}
                    {action.icon}
                  </div>
                  <div className="center middle">{action.name}</div>
                </div>
              </button>
            </Tooltip>

            {action.opts?.resource ? (
              <button
                className="text-center"
                onClick={() => {
                  setResource(resource >= maxResource ? 0 : resource + 1);
                }}
              >
                <div className="flex">
                  <div className="resources middle">
                    <Resource name={action.opts.resource} />
                  </div>
                  <div className="center middle">
                    Use {capitalize(action.opts.resource)}
                  </div>
                  <div className="pill middle">
                    ({resource}/{maxResource})
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
    currentCard: PropTypes.shape({
      card: PropTypes.object,
      show: PropTypes.bool
    }).isRequired,
    cardAction: PropTypes.func,
    player: PropTypes.object
  }),
  card: PropTypes.shape({
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.node
      })
    )
  })
};

export default inject('gameStore')(observer(ActionableCard));
