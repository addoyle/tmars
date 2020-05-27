import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './CardDrawer.scss';
import CardPreview from './CardPreview';
import { isString } from 'lodash';
import classNames from 'classnames';
import { Param } from '../assets/Assets';

/**
 * Card drawer
 */
const CardDrawer = props => {
  const gameStore = props.gameStore;

  const cards = props.cards.map(card => (isString(card) ? { card } : card));
  let cardType = 'project';
  if (props.type === 'corp') {
    cardType = 'corp';
  }
  if (props.type === 'prelude') {
    cardType = 'prelude';
  }

  return (
    <div
      className={classNames('drawer', {
        collapse: gameStore.drawer !== props.type
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div
        className={classNames('drawer-btn', props.type)}
        onClick={() => gameStore.switchDrawer(props.type)}
      >
        {props.tab}
      </div>

      {props.mode === 'buy' ? (
        <div className="button-box">
          <button
            className="primary flex gutter"
            onClick={() => {
              gameStore.switchDrawer('hand');
              gameStore.discardUnbought();
            }}
          >
            <div className="resources middle">
              <span className="x">X</span>
              <Param name="card back" />
            </div>
            <span className="middle">Discard the rest</span>
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
            onClick={() =>
              gameStore.showActiveCard(card.card, cardType, props.mode)
            }
            className={classNames('card-selector', {
              selected:
                gameStore.activeCard.show &&
                card.card === gameStore.activeCard.card &&
                cardType === gameStore.activeCard.type,
              landscape: cardType === 'prelude' || cardType === 'corp'
            })}
          >
            <CardPreview
              card={card.card}
              resources={card.resources}
              type={cardType}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

CardDrawer.propTypes = {
  tab: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  type: PropTypes.string,
  cards: PropTypes.array,
  mode: PropTypes.oneOf(['play', 'action', 'buy', 'draft']),
  gameStore: PropTypes.shape({
    drawer: PropTypes.string,
    switchDrawer: PropTypes.func,
    player: PropTypes.shape({
      cards: PropTypes.shape({
        onDeck: PropTypes.arrayOf(PropTypes.array)
      })
    }),
    activeCard: PropTypes.shape({
      card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
      show: PropTypes.bool
    }),
    showActiveCard: PropTypes.func,
    discardUnbought: PropTypes.func
  })
};

export default inject('gameStore')(observer(CardDrawer));
