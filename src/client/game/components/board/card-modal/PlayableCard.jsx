import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { MegaCredit, Param, Resource } from '../../assets/Assets';
import { Tooltip } from '@material-ui/core';
import classnames from 'classnames';

const PlayableCard = ({ gameStore, card }) => {
  const currentCard = gameStore.currentCard;
  const player = gameStore.player;

  const modifiedCost = gameStore.calculateCost(card, player?.rates.cost);

  // Effective cost is the cost of the card in M€ subtracting resources
  const effectiveCost = Math.max(
    0,
    modifiedCost -
      player?.rates.steel * currentCard.steel -
      player?.rates.titanium * currentCard.titanium -
      currentCard.heat
  );

  // Checks if the card can be played
  const meetsReqs =
    card?.meetsRequirements && card?.meetsRequirements(player, gameStore);
  const canPlay = card?.canPlay && card?.canPlay(player, gameStore);
  const canAfford = player?.resources.megacredit >= effectiveCost;
  const valid = {
    valid: meetsReqs?.valid && canPlay?.valid && canAfford,
    msg: [
      ...meetsReqs?.msg,
      canPlay?.msg,
      !canAfford && "You can't afford this"
    ].filter(m => m)
  };

  // Calculating maximum required resources needed/available to purchase card
  const maxSteel = Math.min(
    Math.ceil(modifiedCost / (player?.rates.steel || 2)),
    player?.resources.steel
  );
  const maxTitanium = Math.min(
    Math.ceil(modifiedCost / (player?.rates.titanium || 3)),
    player?.resources.titanium
  );
  const maxHeat = Math.min(modifiedCost, player?.resources.heat);

  return (
    <>
      {
        // Use Steel button
        card.tags.includes('building') ? (
          <button
            className="text-center"
            onClick={() =>
              (currentCard.steel =
                currentCard.steel >= maxSteel ? 0 : currentCard.steel + 1)
            }
          >
            <div className="flex">
              <div className="resources middle">
                <Resource name="steel" />
              </div>
              <div className="center middle">Use Steel</div>
              <div className="pill middle">
                ({currentCard.steel}/{maxSteel})
              </div>
            </div>
          </button>
        ) : null
      }

      {
        // Use Titanium button
        card.tags.includes('space') ? (
          <button
            className="text-center"
            onClick={() =>
              (currentCard.titanium =
                currentCard.titanium >= maxTitanium
                  ? 0
                  : currentCard.titanium + 1)
            }
          >
            <div className="flex">
              <div className="resources middle">
                <Resource name="titanium" />
              </div>
              <div className="center middle">Use Titanium</div>
              <div className="pill middle">
                ({currentCard.titanium}/{maxTitanium})
              </div>
            </div>
          </button>
        ) : null
      }

      {
        // Use Heat button (only applicable to Helion)
        player?.cards.corp[0].number === '003' ? (
          <button
            className="text-center"
            onClick={() =>
              (currentCard.heat =
                currentCard.heat >= maxHeat ? 0 : currentCard.heat + 1)
            }
          >
            <div className="flex">
              <div className="resources middle">
                <Resource name="heat" />
              </div>
              <div className="center middle">Use Heat</div>
              <div className="pill middle">
                ({currentCard.heat}/{maxHeat})
              </div>
            </div>
          </button>
        ) : null
      }

      <div className="flex gutter">
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
                gameStore.playCard(currentCard.card, {
                  steel: currentCard.steel,
                  titanium: currentCard.titanium,
                  heat: currentCard.heat
                });
                currentCard.show = false;
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

        <button
          className="text-center col-1"
          onClick={() => (currentCard.show = false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

PlayableCard.propTypes = {
  gameStore: PropTypes.shape({
    calculateCost: PropTypes.func,
    currentCard: PropTypes.shape({
      card: PropTypes.object,
      show: PropTypes.bool,
      steel: PropTypes.number,
      titanium: PropTypes.number,
      heat: PropTypes.number
    }).isRequired,
    playCard: PropTypes.func,
    player: PropTypes.shape({
      resources: PropTypes.shape({
        megacredit: PropTypes.number,
        steel: PropTypes.number,
        titanium: PropTypes.number,
        heat: PropTypes.number
      }),
      rates: PropTypes.shape({
        steel: PropTypes.number,
        titanium: PropTypes.number,
        cost: PropTypes.object
      }),
      cards: PropTypes.shape({
        corp: PropTypes.array
      })
    })
  }),
  card: PropTypes.shape({
    tags: PropTypes.array,
    cost: PropTypes.number,
    meetsRequirements: PropTypes.func,
    canPlay: PropTypes.func
  })
};

export default inject('gameStore')(observer(PlayableCard));
