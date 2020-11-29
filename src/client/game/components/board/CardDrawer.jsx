import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './CardDrawer.scss';
import CardPreview from './CardPreview';
import classNames from 'classnames';
import { Param, MegaCredit } from '../assets/Assets';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const buyMode =
    gameStore.phase !== 'draft' &&
    gameStore.player?.cards.buy.length &&
    props.type === 'hand';

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
      {props.mode === 'select' ? (
        <div className="button-box">
          <div
            className={classnames('error', {
              show: numSelected > props.max || numSelected < props.min
            })}
          >
            {props.min === props.max
              ? `Pick ${props.min}`
              : `Pick between ${props.min} and ${props.max}`}
          </div>
          <button
            className="primary flex gutter"
            onClick={() => {
              gameStore.confirmSelection(props.type);
              gameStore.activeCard.show = false;
            }}
            disabled={numSelected > props.max || numSelected < props.min}
          >
            <div className="resources middle">
              <Param name="card back" />
            </div>
            <span className="middle">Confirm</span>
          </button>
        </div>
      ) : null}

      {props.mode === 'draft' ? (
        <div className="on-deck">
          {gameStore.player?.cards.onDeck.map((row, i) => (
            <div className="" key={i}>
              {[...Array(row.length)].map((n, j) => (
                <Param key={j} name="card back" />
              ))}
            </div>
          ))}
        </div>
      ) : null}

      <ul className={classNames('cards', 'buy-mode', { show: buyMode })}>
        {buyMode
          ? gameStore.player?.cards.buy.map(card => (
              <li
                key={`card-${card.card}`}
                onClick={() => props.gameStore.toggleSelectCard(card, 'buy')}
                className={classNames('card-selector', {
                  selected:
                    gameStore.activeCard.show &&
                    card.card === gameStore.activeCard.card.card &&
                    'buy' === gameStore.activeCard.type,
                  disabled: card.disabled
                })}
              >
                <CardPreview card={card} type="project" />
              </li>
            ))
          : null}
      </ul>

      <div
        className={classNames('button-bar', 'flex', 'gutter', 'center', {
          show: buyMode
        })}
      >
        <div className="col-1">
          <div className="resources">
            {gameStore.player?.cards.corp.length === 1 ? (
              <>
                <MegaCredit value={0} />
                <span>
                  {
                    cardStore.get('corp', gameStore.player?.cards.corp[0].card)
                      ?.title
                  }
                </span>
              </>
            ) : (
              <em style={{ fontSize: '.5em', color: '#000a' }}>
                No corporation picked yet
              </em>
            )}
          </div>
        </div>
        <div className="col-2 flex gutter center center-items">
          <div className="pill text-center">
            <span className="section">
              <FontAwesomeIcon icon="chevron-up" />
            </span>
            <span>For sale</span>
          </div>
          <button
            className="primary flex gutter"
            onClick={() => {
              gameStore.buySelectedCards();
            }}
            disabled={
              gameStore.player?.cards.corp.length !== 1 ||
              !(
                numToBuy * gameStore.player?.rates.buy <=
                  gameStore.player?.resources.megacredit ||
                (gameStore.phase === 'start' &&
                  numToBuy * gameStore.player?.rates.buy <=
                    cardStore.get('corp', gameStore.player?.cards.corp[0].card)
                      ?.starting.resources.megacredit)
              )
            }
          >
            <div className="resources middle">
              <Param name="card back" />
            </div>
            <span className="middle">Comfirm {numToBuy} Cards</span>
            <div className="resources middle">
              <MegaCredit value={numToBuy * gameStore.player?.rates.buy} />
            </div>
          </button>
          <div className="pill text-center">
            <span>Hand</span>
            <span className="section">
              <FontAwesomeIcon icon="chevron-down" />
            </span>
          </div>
        </div>
        <div className="col-1" />
      </div>

      <ul className="cards">
        {cards.map(card => (
          <li
            key={`card-${card.card}`}
            onClick={() =>
              !card.disabled
                ? gameStore.showActiveCard(card, cardType, props.mode)
                : null
            }
            className={classNames('card-selector', {
              selected:
                gameStore.activeCard.show &&
                card.card === gameStore.activeCard.card.card &&
                cardType === gameStore.activeCard.type,
              disabled: card.disabled,
              landscape: cardType === 'prelude' || cardType === 'corp'
            })}
          >
            <CardPreview
              card={card}
              resources={card.resources}
              type={cardType}
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
    player: PropTypes.shape({
      resources: PropTypes.shape({
        megacredit: PropTypes.number
      }),
      cards: PropTypes.shape({
        onDeck: PropTypes.arrayOf(PropTypes.array),
        corp: PropTypes.array,
        buy: PropTypes.array
      }),
      rates: PropTypes.shape({
        buy: PropTypes.number
      })
    }),
    activeCard: PropTypes.shape({
      card: PropTypes.shape({
        card: PropTypes.string,
        select: PropTypes.bool,
        resources: PropTypes.objectOf(PropTypes.number)
      }),
      disabled: PropTypes.bool,
      type: PropTypes.string,
      show: PropTypes.bool
    }),
    showActiveCard: PropTypes.func,
    buySelectedCards: PropTypes.func,
    confirmSelection: PropTypes.func,
    confirmReveal: PropTypes.func
  }),
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(CardDrawer));
