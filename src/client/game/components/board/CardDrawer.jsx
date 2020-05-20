import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './CardDrawer.scss';
import CardPreview from './CardPreview';
import { isString } from 'lodash';
import classNames from 'classnames';

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
      <button
        className={classNames('drawer-btn', props.type)}
        onClick={() => gameStore.switchDrawer(props.type)}
      >
        {props.tab}
      </button>

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
              landscape: cardType === 'prelude'
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
  mode: PropTypes.oneOf(['play', 'action']),
  gameStore: PropTypes.shape({
    drawer: PropTypes.string,
    switchDrawer: PropTypes.func,
    activeCard: PropTypes.shape({
      card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
      show: PropTypes.bool
    }),
    showActiveCard: PropTypes.func
  })
};

export default inject('gameStore')(observer(CardDrawer));
