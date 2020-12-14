import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CardPreview from './CardPreview';
import classnames from 'classnames';
import './ActiveCard.scss';
import { Param, MegaCredit, Resource } from '../assets/Assets';
import { Tooltip } from '@material-ui/core';

/**
 * Shows the currently selected card
 */
const ActiveCard = ({ gameStore, cardStore }) => {
  const activeCard = gameStore.activeCard;
  const player = gameStore.player;

  // Ref for container, used in dragging
  const containerRef = useRef(null);

  // State for dragging
  const [dragging, setDragging] = useState(false);

  const card = cardStore.get(activeCard.type, activeCard.card);

  // Calculating maximum required resources needed/available to purchase card
  const maxSteel = Math.min(
    Math.ceil(card?.cost / (player?.rates.steel || 2)),
    player?.resources.steel
  );
  const maxTitanium = Math.min(
    Math.ceil(card?.cost / (player?.rates.titanium || 3)),
    player?.resources.titanium
  );
  const maxHeat = Math.min(card?.cost, player?.resources.heat);

  // Current player's turn
  const myTurn = gameStore.turn === player?.number;

  // The card is "playable", i.e. a card from the current player's hand
  const playable =
    activeCard.mode === 'play' && myTurn && activeCard.type === 'project';

  // Effective cost is the cost of the card in M€ subtracting resources
  const effectiveCost = Math.max(
    0,
    gameStore.calculateCost(card, player?.rates.cost) -
      player?.rates.steel * activeCard.steel -
      player?.rates.titanium * activeCard.titanium -
      activeCard.heat
  );

  // Checks if the card can be played
  const meetsReqs =
    card?.meetsRequirements && card?.meetsRequirements(player, gameStore);
  const canPlay = card?.canPlay && card?.canPlay(player, gameStore);
  const canAfford = player?.resources.megacredit >= effectiveCost;
  const valid = {
    valid: meetsReqs?.valid && canPlay?.valid && canAfford,
    msg: [
      meetsReqs?.msg,
      canPlay?.msg,
      !canAfford && "You can't afford this"
    ].filter(m => m)
  };

  return (
    <div
      className={classnames('active-card', {
        show: activeCard.show
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
      ref={containerRef}
    >
      {activeCard.card ? (
        <div
          onMouseDown={() => setDragging(activeCard.show)}
          onMouseUp={() => setDragging(false)}
          onMouseMove={e => {
            if (dragging) {
              // Move card where mouse moves
              e.stopPropagation();
              containerRef.current.style.left =
                containerRef.current.offsetLeft + e.movementX + 'px';
              containerRef.current.style.top =
                containerRef.current.offsetTop + e.movementY + 'px';
            }
          }}
          onMouseLeave={() => setDragging(false)}
        >
          <CardPreview
            card={activeCard.card}
            type={activeCard.type}
            costModifiers={player.rates.cost}
          />
        </div>
      ) : null}
      <div className="footer">
        {playable && card.tags.includes('building') ? (
          <button
            className="text-center"
            onClick={() =>
              (activeCard.steel =
                activeCard.steel >= maxSteel ? 0 : activeCard.steel + 1)
            }
          >
            <div className="flex">
              <div className="resources middle">
                <Resource name="steel" />
              </div>
              <div className="center middle">Use Steel</div>
              <div className="pill middle">
                ({activeCard.steel}/{maxSteel})
              </div>
            </div>
          </button>
        ) : null}

        {playable && card.tags.includes('space') ? (
          <button
            className="text-center"
            onClick={() =>
              (activeCard.titanium =
                activeCard.titanium >= maxTitanium
                  ? 0
                  : activeCard.titanium + 1)
            }
          >
            <div className="flex">
              <div className="resources middle">
                <Resource name="titanium" />
              </div>
              <div className="center middle">Use Titanium</div>
              <div className="pill middle">
                ({activeCard.titanium}/{maxTitanium})
              </div>
            </div>
          </button>
        ) : null}

        {
          // Only Helion can use heat as M€
          playable && player?.cards.corp[0].number === 3 ? (
            <button
              className="text-center"
              onClick={() =>
                (activeCard.heat =
                  activeCard.heat >= maxHeat ? 0 : activeCard.heat + 1)
              }
            >
              <div className="flex">
                <div className="resources middle">
                  <Resource name="heat" />
                </div>
                <div className="center middle">Use Heat</div>
                <div className="pill middle">
                  ({activeCard.heat}/{maxHeat})
                </div>
              </div>
            </button>
          ) : null
        }

        <div className="flex gutter">
          {activeCard.mode === 'draft' ? (
            <button
              className="text-center col-1"
              onClick={() => {
                gameStore.draftCard(activeCard.card);
                activeCard.show = false;
              }}
            >
              <div className="flex">
                <div className="resources middle">
                  <Param name="card back" />
                </div>
                <div className="center middle">Draft</div>
              </div>
            </button>
          ) : null}

          {activeCard.mode === 'select' ? (
            <button
              className="text-center col-1"
              onClick={() => {
                gameStore.toggleSelectCard(activeCard.card, activeCard.type);
                activeCard.show = false;
              }}
            >
              <div className="flex">
                <div className="resources middle">
                  <Param name="card back" />
                </div>
                <div className="center middle">
                  {activeCard.card.select ? 'Deselect' : 'Select'}
                </div>
              </div>
            </button>
          ) : null}

          {activeCard.mode === 'play' && myTurn && !gameStore.playerStatus ? (
            activeCard.type === 'prelude' ? (
              <button
                className="primary text-center col-1"
                onClick={() => {
                  gameStore.playPrelude(activeCard.card);
                  activeCard.show = false;
                }}
              >
                <div className="flex">
                  <div className="resources middle">
                    <Param name="card prelude landscape" />
                  </div>
                  <div className="center middle">Play</div>
                </div>
              </button>
            ) : (
              <Tooltip
                title={
                  valid?.msg.length ? (
                    <>
                      {valid?.msg.map((msg, i) => (
                        <p key={i}>{msg}</p>
                      ))}
                    </>
                  ) : (
                    ''
                  )
                }
                arrow
              >
                <button
                  className={classnames('primary text-center col-1', {
                    disabled: !valid?.valid
                  })}
                  onClick={() => {
                    if (valid?.valid) {
                      gameStore.playCard(activeCard.card, {
                        steel: activeCard.steel,
                        titanium: activeCard.titanium,
                        heat: activeCard.heat
                      });
                      activeCard.show = false;
                    }
                  }}
                >
                  <div className="flex">
                    <div className="resources middle">
                      <Param name="card back" />
                    </div>
                    <div className="center middle">Play</div>
                    <div className="resources middle">
                      <MegaCredit value={effectiveCost} />
                    </div>
                  </div>
                </button>
              </Tooltip>
            )
          ) : null}
          <button
            className="text-center col-1"
            onClick={() => (activeCard.show = false)}
          >
            {activeCard.mode ? 'Cancel' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

ActiveCard.propTypes = {
  gameStore: PropTypes.shape({
    activeCard: PropTypes.shape({
      show: PropTypes.bool,
      card: PropTypes.oneOfType([
        PropTypes.shape({
          card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          select: PropTypes.bool,
          resources: PropTypes.objectOf(PropTypes.number)
        }),
        PropTypes.string
      ]),
      type: PropTypes.string,
      resources: PropTypes.object,
      mode: PropTypes.oneOf(['play', 'action', 'buy', 'draft', 'select']),
      steel: PropTypes.number,
      titanium: PropTypes.number,
      heat: PropTypes.number
    }).isRequired,
    playCard: PropTypes.func,
    playPrelude: PropTypes.func,
    toggleSelectCard: PropTypes.func,
    draftCard: PropTypes.func,
    turn: PropTypes.number,
    player: PropTypes.shape({
      cards: PropTypes.shape({
        corp: PropTypes.arrayOf(
          PropTypes.shape({
            number: PropTypes.number
          })
        )
      }),
      resources: PropTypes.shape({
        megacredit: PropTypes.number,
        steel: PropTypes.number,
        titanium: PropTypes.number,
        heat: PropTypes.number
      }),
      rates: PropTypes.shape({
        steel: PropTypes.number,
        titanium: PropTypes.number,
        heat: PropTypes.number,
        cost: PropTypes.object
      }),
      number: PropTypes.number
    }),
    calculateCost: PropTypes.func,
    playerStatus: PropTypes.object
  }).isRequired,
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(ActiveCard));
