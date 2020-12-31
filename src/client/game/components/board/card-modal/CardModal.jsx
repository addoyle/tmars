import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CardPreview from '../CardPreview';
import classnames from 'classnames';
import './CardModal.scss';
import PlayableCard from './PlayableCard';
import PlayablePrelude from './PlayablePrelude';
import ActionableCard from './ActionableCard';

/**
 * Shows the currently selected card
 */
const CardModal = ({ gameStore, cardStore }) => {
  const currentCard = gameStore.currentCard;
  const player = gameStore.player;

  // Ref for container, used in dragging
  const containerRef = useRef(null);

  // State for dragging
  const [dragging, setDragging] = useState(false);

  const card = cardStore.get(currentCard.type, currentCard.card);

  // Current player's turn
  const myTurn = gameStore.turn === player?.number;

  return (
    <div
      className={classnames('card-modal', {
        show: currentCard.show
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
      ref={containerRef}
    >
      {currentCard.card ? (
        <div
          onMouseDown={() => setDragging(currentCard.show)}
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
            card={currentCard.card}
            type={currentCard.type}
            costModifiers={player.rates.cost}
            showResources={currentCard.showResources}
          />
        </div>
      ) : null}

      <div className="footer">
        {currentCard.mode === 'play' && myTurn && !gameStore.playerStatus ? (
          currentCard.type === 'project' ? (
            <PlayableCard card={card} />
          ) : currentCard.type === 'prelude' ? (
            <PlayablePrelude />
          ) : null
        ) : currentCard.mode === 'action' &&
          myTurn &&
          !gameStore.playerStatus &&
          card.actions?.length ? (
          <ActionableCard card={card} />
        ) : (
          <button
            className="text-center col-1"
            onClick={() => (currentCard.show = false)}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

CardModal.propTypes = {
  gameStore: PropTypes.shape({
    currentCard: PropTypes.shape({
      show: PropTypes.bool,
      card: PropTypes.object,
      type: PropTypes.string,
      mode: PropTypes.oneOf(['play', 'action', 'buy', 'draft', 'select']),
      showResources: PropTypes.bool
    }).isRequired,
    turn: PropTypes.number,
    player: PropTypes.shape({
      rates: PropTypes.shape({
        cost: PropTypes.object
      }),
      number: PropTypes.number
    }),
    playerStatus: PropTypes.object
  }).isRequired,
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(CardModal));
