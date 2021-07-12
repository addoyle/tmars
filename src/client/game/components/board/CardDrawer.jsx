import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './CardDrawer.scss';
import CardPreview from './CardPreview';
import classNames from 'classnames';
import { Param, MegaCredit } from '../assets/Assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardRef from './CardRef';
import { last } from 'lodash';

/**
 * Card drawer
 */
const CardDrawer = props => {
  const gameStore = props.gameStore;
  const cardStore = props.cardStore;
  const player = gameStore.player;
  const stackAction = last(player?.actionStack);

  let cardType = 'project';
  if (props.type === 'corp') {
    cardType = 'corp';
  }
  if (props.type === 'prelude') {
    cardType = 'prelude';
  }

  // Cards in the drawer
  const cards = (props.type === 'chooser' && stackAction?.cards) ||
    (player?.cards[props.type] && { 0: player?.cards[props.type] }) || {
      0: []
    };
  // The number of selected cards
  const numSelected = Object.values(cards)
    .flat()
    .filter(card => card?.select).length;
  // The number of cards that are staged to be purchased
  const numToBuy = player?.cards.buy.filter(card => card?.select).length;

  // Used to calculate if the second "buy" drawer should be displayed
  const buyMode =
    // There are cards in the "buy" deck
    player?.cards.buy.length &&
    // The selected drawer is the 'hand' drawer
    props.type === 'hand' &&
    // The game phase is NOT the research phase (that's handled differently)
    (gameStore.phase !== 'research' ||
      // Or if it is, only show when all 4 cards are drafted
      (gameStore.phase === 'research' && player?.cards.buy.length === 4));

  // Draft mode
  const draftMode = props.type === 'draft';

  // Start mode
  const startMode = gameStore.phase === 'start';

  // Status of the start phase
  const startPhase = {
    corp: player?.cards.corp.length === 1,
    prelude: player?.cards.prelude.length === 2,
    hand: !player?.cards.buy.length
  };

  return (
    <div
      className={classNames('drawer', {
        collapse: props.collapse,
        empty: !Object.values(cards).flat().length && !buyMode,
        'buy-mode': buyMode
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      {props.mode === 'draft' ? (
        <div className="on-deck">
          {player?.cards.onDeck.map((row, i) => (
            <div key={i}>
              {[...Array(row.length)].map((n, j) => (
                <Param key={j} name="card back" />
              ))}
            </div>
          ))}
        </div>
      ) : null}

      <ul
        className={classNames('cards', 'buy-mode', {
          show: buyMode
        })}
      >
        {buyMode
          ? // Show the BUY drawer
            player?.cards.buy.map(card => (
              <li
                key={`card-${card?.card}`}
                onClick={() => props.gameStore.toggleSelectCard(card, 'buy')}
                className={classNames('card-selector', {
                  selected:
                    gameStore.ui.currentCard.show &&
                    card?.card === gameStore.ui.currentCard.card.card &&
                    'buy' === gameStore.ui.currentCard.type,
                  disabled: card?.disabled
                })}
              >
                <CardPreview card={card} type="project" showZoom />
              </li>
            ))
          : null}
      </ul>

      {
        // Show the button bar if selection mode is enabled
        props.mode === 'select' ||
        // Or it's draft, buy, or start mode
        draftMode ||
        buyMode ||
        startMode ||
        // Or it's your turn to play actions (shows Skip/Pass buttons)
        ((gameStore.phase === 'action' || gameStore.phase === 'prelude') &&
          gameStore.turn === player.number) ? (
          <div
            className={classNames(
              'button-bar flex gutter center center-items',
              { 'buy-mode': buyMode }
            )}
          >
            <div className="col-1 flex" style={{ paddingLeft: '1em' }}>
              {buyMode || props.mode === 'select' ? (
                player?.cards.corp.length === 1 &&
                gameStore.phase === 'start' ? (
                  // Show information about the selected corp
                  <div className="resources">
                    <MegaCredit
                      value={
                        cardStore.get(player?.cards.corp[0].card)?.resources
                          .megacredit
                      }
                    />
                    <CardRef type="corp" card={player?.cards.corp[0].card} />
                  </div>
                ) : (
                  // No corp picked yet
                  <div
                    className="pill text-center"
                    style={{ backgroundColor: '#f002' }}
                  >
                    {buyMode
                      ? 'No corporation yet'
                      : props.min === props.max
                      ? `Pick ${props.min}`
                      : `Pick between ${props.min} and ${props.max}`}
                  </div>
                )
              ) : null}
            </div>
            <div className="col-2 flex gutter center center-items">
              {buyMode ? (
                // Show up arrow to notate that the top section is cards TO BE BOUGHT
                <div className="pill text-center">
                  <span className="section">
                    <FontAwesomeIcon icon="chevron-up" />
                  </span>
                  <span>For sale</span>
                </div>
              ) : (
                startMode && <div className="col-1" />
              )}

              {
                // Show a confirmation button if the current phase isn't action or prelude
                (gameStore.phase !== 'action' &&
                  gameStore.phase !== 'prelude' &&
                  // And the player has not already picked their starting cards for this drawer
                  startMode &&
                  !startPhase[props.type]) ||
                // Or if we're in draft or buy mode
                draftMode ||
                buyMode ||
                // Or if the player is trying to buy cards
                stackAction?.type === 'buy-card' ? (
                  <button
                    className="primary flex gutter center"
                    onClick={() =>
                      buyMode
                        ? gameStore.buySelectedCards()
                        : draftMode
                        ? gameStore.draftCard()
                        : gameStore.confirmSelection(props.type)
                    }
                    disabled={
                      // Disable the button in BUY mode
                      buyMode
                        ? // If there's no selected corp
                          player?.cards.corp.length !== 1 ||
                          // Or you can't afford all the selected cards
                          !(
                            numToBuy * player?.rates.buy <=
                              player?.resources.megacredit ||
                            // Or can't afford all the selected cards in the start phase
                            (gameStore.phase === 'start' &&
                              numToBuy * player?.rates.buy <=
                                cardStore.get(player?.cards.corp[0].card)
                                  ?.resources.megacredit)
                          )
                        : // Disable the button if the number of cards selected is out of the allowable range
                          // (e.g. 1 corp, 2 preludes, etc.)
                          numSelected > props.max || numSelected < props.min
                    }
                  >
                    <div className="resources middle">
                      <Param name="card back" />
                    </div>

                    <span className="middle col-1">
                      {buyMode ? 'Buy' : draftMode ? 'Draft' : 'Confirm'}{' '}
                      {buyMode ? numToBuy : numSelected} Cards
                    </span>

                    {buyMode ? (
                      <div className="resources middle">
                        <MegaCredit value={numToBuy * player?.rates.buy} />
                      </div>
                    ) : (
                      draftMode && (
                        <div className="middle">
                          <FontAwesomeIcon
                            fixedWidth
                            icon={`arrow-alt-circle-${
                              ['right', 'left'][gameStore.params.generation % 2]
                            }`}
                          />
                        </div>
                      )
                    )}
                  </button>
                ) : startMode ? (
                  <div style={{ width: '60%' }} />
                ) : (
                  <div className="pill">
                    {stackAction?.type === 'prompt-card' &&
                    stackAction?.deck === 'hand'
                      ? stackAction?.desc || 'Play a card from hand'
                      : 'Your Turn'}
                  </div>
                )
              }

              {buyMode ? (
                // Show down arrow to notate that the bottom section is cards IN YOUR HAND
                <div className="pill text-center">
                  <span>Hand</span>
                  <span className="section">
                    <FontAwesomeIcon icon="chevron-down" />
                  </span>
                </div>
              ) : (
                startMode && (
                  // Tell the user what they need to finish choosing to complete their start phase
                  <div className="pill text-center col-1">
                    <span>Also Pick</span>
                    <span className="section">
                      <FontAwesomeIcon icon="chevron-right" />
                    </span>
                  </div>
                )
              )}
            </div>

            <div
              className="col-1 flex gutter right"
              style={{ paddingRight: '.5em' }}
            >
              {gameStore.phase === 'action' &&
              !player.actionStack.length &&
              props.type !== 'reveal' ? (
                // Show skip/pass button
                <button
                  className="flex gutter center-items"
                  onClick={() => gameStore.passSkip()}
                >
                  <span className="col-1" />
                  <span className="col-5">
                    {player.firstAction ? 'Pass' : 'Skip'}
                  </span>
                  <span className="col-1">
                    <FontAwesomeIcon
                      icon={player.firstAction ? 'check-square' : 'forward'}
                    />
                  </span>
                </button>
              ) : (
                startMode && (
                  //Show Corp/Prelude/Hand buttons
                  <>
                    {props.type !== 'hand' && (
                      <button
                        className="col-1 flex"
                        onClick={() => gameStore.switchDrawer('hand')}
                        disabled={startPhase.hand}
                      >
                        <div className="hand middle">
                          <Param name="card back" />
                          <Param name="card back" />
                          <Param name="card back" />
                        </div>
                        <div className="col-1 text middle">Hand</div>
                      </button>
                    )}
                    {props.type !== 'corp' && (
                      <button
                        className="col-1 flex"
                        onClick={() => gameStore.switchDrawer('corp')}
                        disabled={startPhase.corp}
                      >
                        <div className="middle">
                          <Param name="card corp landscape" />
                        </div>
                        <div className="col-1 text middle">Corporation</div>
                      </button>
                    )}
                    {props.type !== 'prelude' &&
                      gameStore.sets.includes('prelude') && (
                        <button
                          className="col-1 flex"
                          onClick={() => gameStore.switchDrawer('prelude')}
                          disabled={startPhase.prelude}
                        >
                          <div className="middle">
                            <Param name="card prelude landscape" />
                          </div>
                          <div className="col-1 text middle">Preludes</div>
                        </button>
                      )}
                  </>
                )
              )}
            </div>
          </div>
        ) : null
      }

      {Object.keys(cards).map(group => (
        <React.Fragment key={`group-${group}`}>
          {gameStore.players[group - 1] &&
            (Object.keys(cards).length > 1 || group !== `${player.number}`) && (
              <h2>{gameStore.players[group - 1].name}</h2>
            )}
          <ul className="cards">
            {
              // Show cards in drawer
              cards[group].map(card => (
                <li
                  key={`card-${group}-${card?.card || card}`}
                  onClick={() =>
                    // Disable action if card is disabled
                    !card?.disabled
                      ? // Select card if in select or draft mode
                        props.mode === 'select' || props.mode === 'draft'
                        ? gameStore.toggleSelectCard(
                            card,
                            props.type,
                            props.min === 1 && props.max === 1
                              ? { single: true }
                              : null
                          )
                        : // Otherwise show the card
                          gameStore.showCurrentCard(
                            card,
                            cardType,
                            props.mode,
                            props.type === 'active' || props.type === 'corp'
                          )
                      : null
                  }
                  className={classNames('card-selector', {
                    selected:
                      // Denote that the card is "active" if a card is shown
                      gameStore.ui.currentCard.show &&
                      // And that shown card matches this card
                      card?.card === gameStore.ui.currentCard.card.card,
                    disabled: card?.disabled,
                    landscape: cardType === 'prelude' || cardType === 'corp'
                  })}
                >
                  <CardPreview
                    card={card}
                    resources={card?.resources}
                    // type={cardType}
                    costModifiers={props.type ? player.rates.cost : []}
                    reqModifiers={props.type ? player.rates.requirement : {}}
                    showZoom={props.mode === 'select' || props.mode === 'draft'}
                    showResources={
                      gameStore.phase !== 'start' &&
                      ['active', 'corp'].includes(props.type)
                    }
                  />
                </li>
              ))
            }
            {draftMode && player?.cards.buy.length ? (
              // In draft mode, the cards that can be drafted and have been drafted
              // are shown side-by-side, with a separator in between
              <>
                <li className="separator" />
                {player?.cards.buy.map(card => (
                  <li
                    key={`card-${card?.card || card}`}
                    onClick={() => gameStore.showCurrentCard(card, 'project')}
                    className={classNames('card-selector', {
                      selected:
                        gameStore.ui.currentCard.show &&
                        card?.card === gameStore.ui.currentCard.card.card &&
                        cardType === gameStore.ui.currentCard.type
                    })}
                  >
                    <CardPreview card={card} type="project" showZoom />
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
};

CardDrawer.defaultProps = {
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY
};

CardDrawer.propTypes = {
  tab: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  type: PropTypes.string,
  cards: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.objectOf(PropTypes.array)
  ]),
  mode: PropTypes.oneOf(['play', 'action', 'buy', 'draft', 'select']),
  collapse: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  gameStore: PropTypes.shape({
    ui: PropTypes.shape({
      currentCard: PropTypes.shape({
        card: PropTypes.shape({
          card: PropTypes.string,
          select: PropTypes.bool,
          resources: PropTypes.objectOf(PropTypes.number)
        }),
        disabled: PropTypes.bool,
        type: PropTypes.string,
        show: PropTypes.bool
      })
    }),
    switchDrawer: PropTypes.func,
    toggleSelectCard: PropTypes.func,
    phase: PropTypes.string,
    turn: PropTypes.number,
    player: PropTypes.shape({
      number: PropTypes.number,
      resources: PropTypes.shape({
        megacredit: PropTypes.number
      }),
      cards: PropTypes.shape({
        onDeck: PropTypes.arrayOf(PropTypes.array),
        corp: PropTypes.array,
        prelude: PropTypes.array,
        buy: PropTypes.array,
        draft: PropTypes.array
      }),

      rates: PropTypes.shape({
        buy: PropTypes.number,
        cost: PropTypes.object,
        requirement: PropTypes.object
      }),
      firstAction: PropTypes.bool,
      actionStack: PropTypes.array
    }),
    players: PropTypes.array,
    params: PropTypes.shape({
      generation: PropTypes.number
    }),
    showCurrentCard: PropTypes.func,
    buySelectedCards: PropTypes.func,
    draftCard: PropTypes.func,
    confirmSelection: PropTypes.func,
    confirmReveal: PropTypes.func,
    passSkip: PropTypes.func,
    sets: PropTypes.array
  }),
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(CardDrawer));
