import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './CardDrawer.scss';
import CardPreview from './CardPreview';
import classNames from 'classnames';
import { Param, MegaCredit } from '../assets/Assets';
import classnames from 'classnames';

/**
 * Card drawer
 */
const CardDrawer = props => {
  const gameStore = props.gameStore;

  let cardType = 'project';
  if (props.type === 'corp') {
    cardType = 'corp';
  }
  if (props.type === 'prelude') {
    cardType = 'prelude';
  }

  const cards = props.gameStore.player?.cards[props.type] || [];
  const numSelected = props.gameStore.player?.cards[props.type].filter(
    card => card.select
  ).length;

  return (
    <div
      className={classNames('drawer', {
        collapse: props.collapse,
        empty: !cards.length
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      {props.mode === 'buy' ? (
        <div className="button-box">
          <button
            className="primary flex gutter"
            onClick={() => {
              gameStore.switchDrawer('hand');
              gameStore.buySelectedCards();
            }}
          >
            <div className="resources middle">
              <Param name="card back" />
            </div>
            <span className="middle">Buy {numSelected} Cards</span>
            <div className="resources middle">
              <MegaCredit value={numSelected * 3} />
            </div>
          </button>
        </div>
      ) : null}

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

      <ul className="cards">
        {cards.map(card => (
          <li
            key={`card-${card.card}`}
            onClick={() => gameStore.showActiveCard(card, cardType, props.mode)}
            className={classNames('card-selector', {
              selected:
                gameStore.activeCard.show &&
                card.card === gameStore.activeCard.card &&
                cardType === gameStore.activeCard.type,
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
    player: PropTypes.shape({
      cards: PropTypes.shape({
        onDeck: PropTypes.arrayOf(PropTypes.array)
      })
    }),
    activeCard: PropTypes.shape({
      card: PropTypes.shape({
        card: PropTypes.string,
        select: PropTypes.bool,
        resources: PropTypes.objectOf(PropTypes.number)
      }),
      type: PropTypes.string,
      show: PropTypes.bool
    }),
    showActiveCard: PropTypes.func,
    buySelectedCards: PropTypes.func
  })
};

export default inject('gameStore')(observer(CardDrawer));
