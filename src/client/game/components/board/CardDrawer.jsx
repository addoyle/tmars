import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './CardDrawer.scss';
import CardPreview from './CardPreview';
import classNames from 'classnames';
import { Param, MegaCredit } from '../assets/Assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardRef from './CardRef';

/**
 * Card drawer
 */
const CardDrawer = props => {
  const gameStore = props.gameStore;
  const cardStore = props.cardStore;

  let cardType = 'project';
  if (props.type === 'corp') {
    cardType = 'corp';
  }
  if (props.type === 'prelude') {
    cardType = 'prelude';
  }

  const cards = gameStore.player?.cards[props.type] || [];
  const numSelected = cards.filter(card => card.select).length;
  const numToBuy = gameStore.player?.cards.buy.filter(card => card.select)
    .length;

  const buyMode = gameStore.player?.cards.buy.length && props.type === 'hand';
  const draftMode =
    gameStore.player?.cards.draft.length && props.type === 'hand';

  return (
    <div
      className={classNames('drawer', {
        collapse: props.collapse,
        empty: !cards.length && !buyMode,
        'buy-mode': buyMode
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      {props.mode === 'research' ? (
        <div className="on-deck">
          {gameStore.player?.cards.onDeck.map((row, i) => (
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
          show: buyMode || draftMode
        })}
      >
        {buyMode
          ? gameStore.player?.cards.buy.map(card => (
              <li
                key={`card-${card.card}`}
                onClick={() => props.gameStore.toggleSelectCard(card, 'buy')}
                className={classNames('card-selector', {
                  selected:
                    gameStore.currentCard.show &&
                    card.card === gameStore.currentCard.card.card &&
                    'buy' === gameStore.currentCard.type,
                  disabled: card.disabled
                })}
              >
                <CardPreview card={card} type="project" />
              </li>
            ))
          : null}
      </ul>

      {props.mode === 'select' ||
      buyMode ||
      ((gameStore.phase === 'action' ||
        (gameStore.phase === 'prelude' && gameStore.playerStatus?.modifiers)) &&
        gameStore.turn === gameStore.player.number) ? (
        <div
          className={classNames('button-bar flex gutter center center-items', {
            'buy-mode': buyMode
          })}
        >
          <div className="col-1" style={{ paddingLeft: '1em' }}>
            <div className="resources">
              {buyMode ? (
                gameStore.player?.cards.corp.length === 1 ? (
                  <>
                    <MegaCredit
                      value={
                        cardStore.get(
                          'corp',
                          gameStore.player?.cards.corp[0].card
                        )?.startingMC
                      }
                    />
                    <CardRef
                      type="corp"
                      card={gameStore.player?.cards.corp[0].card}
                    />
                  </>
                ) : (
                  <em style={{ fontSize: '.5em', color: '#200a' }}>
                    {buyMode
                      ? 'No corporation yet'
                      : props.min === props.max
                      ? `Pick ${props.min}`
                      : `Pick between ${props.min} and ${props.max}`}
                  </em>
                )
              ) : null}
            </div>
          </div>
          <div className="col-2 flex gutter center center-items">
            {buyMode ? (
              <div className="pill text-center">
                <span className="section">
                  <FontAwesomeIcon icon="chevron-up" />
                </span>
                <span>For sale</span>
              </div>
            ) : null}
            {(gameStore.phase !== 'action' && gameStore.phase !== 'prelude') ||
            gameStore.playerStatus?.type === 'buy-card' ? (
              <button
                className="primary flex gutter center"
                onClick={() =>
                  buyMode
                    ? gameStore.buySelectedCards()
                    : gameStore.confirmSelection(props.type)
                }
                disabled={
                  buyMode
                    ? gameStore.player?.cards.corp.length !== 1 ||
                      !(
                        numToBuy * gameStore.player?.rates.buy <=
                          gameStore.player?.resources.megacredit ||
                        (gameStore.phase === 'start' &&
                          numToBuy * gameStore.player?.rates.buy <=
                            cardStore.get(
                              'corp',
                              gameStore.player?.cards.corp[0].card
                            )?.startingMC)
                      )
                    : numSelected > props.max || numSelected < props.min
                }
              >
                <div className="resources middle">
                  <Param name="card back" />
                </div>
                <span className="middle col-1">
                  {buyMode ? 'Buy' : 'Confirm'}{' '}
                  {buyMode ? numToBuy : numSelected} Cards
                </span>
                {buyMode ? (
                  <div className="resources middle">
                    <MegaCredit
                      value={numToBuy * gameStore.player?.rates.buy}
                    />
                  </div>
                ) : null}
              </button>
            ) : (
              <div className="pill">
                {gameStore.playerStatus?.type === 'prompt-card'
                  ? gameStore.playerStatus.modifiers?.desc ||
                    'Play a card from hand'
                  : 'Your Turn'}
              </div>
            )}
            {buyMode ? (
              <div className="pill text-center">
                <span>Hand</span>
                <span className="section">
                  <FontAwesomeIcon icon="chevron-down" />
                </span>
              </div>
            ) : null}
          </div>
          <div
            className="col-1 flex gutter right"
            style={{ paddingRight: '.5em' }}
          >
            {gameStore.phase === 'action' ? (
              <button
                className="flex gutter center-items"
                onClick={() => gameStore.passSkip()}
              >
                <span className="col-1" />
                <span className="col-5">
                  {gameStore.player.firstAction ? 'Pass' : 'Skip'}
                </span>
                <span className="col-1">
                  <FontAwesomeIcon
                    icon={
                      gameStore.player.firstAction ? 'times-circle' : 'forward'
                    }
                  />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <ul className="cards">
        {cards.map(card => (
          <li
            key={`card-${card.card || card}`}
            onClick={() =>
              !card.disabled
                ? props.mode === 'select'
                  ? gameStore.toggleSelectCard(card, cardType)
                  : gameStore.showCurrentCard(
                      card,
                      cardType,
                      props.mode,
                      props.type === 'active' || props.type === 'corp'
                    )
                : null
            }
            className={classNames('card-selector', {
              selected:
                gameStore.currentCard.show &&
                card.card === gameStore.currentCard.card.card &&
                cardType === gameStore.currentCard.type,
              disabled: card.disabled,
              landscape: cardType === 'prelude' || cardType === 'corp'
            })}
          >
            <CardPreview
              card={card}
              resources={card.resources}
              type={cardType}
              costModifiers={props.type ? gameStore.player.rates.cost : []}
              showResources={props.type === 'active' || props.type === 'corp'}
            />
          </li>
        ))}
      </ul>
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
  cards: PropTypes.array,
  mode: PropTypes.oneOf(['play', 'action', 'buy', 'draft', 'select']),
  collapse: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  gameStore: PropTypes.shape({
    drawer: PropTypes.string,
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
        buy: PropTypes.array,
        draft: PropTypes.array
      }),
      rates: PropTypes.shape({
        buy: PropTypes.number,
        cost: PropTypes.object
      }),
      firstAction: PropTypes.bool
    }),
    currentCard: PropTypes.shape({
      card: PropTypes.shape({
        card: PropTypes.string,
        select: PropTypes.bool,
        resources: PropTypes.objectOf(PropTypes.number)
      }),
      disabled: PropTypes.bool,
      type: PropTypes.string,
      show: PropTypes.bool
    }),
    showCurrentCard: PropTypes.func,
    buySelectedCards: PropTypes.func,
    confirmSelection: PropTypes.func,
    confirmReveal: PropTypes.func,
    passSkip: PropTypes.func,
    playerStatus: PropTypes.shape({
      type: PropTypes.string,
      modifiers: PropTypes.shape({
        desc: PropTypes.string
      })
    })
  }),
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(CardDrawer));
