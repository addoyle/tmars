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
  const currentCard = gameStore.ui.currentCard;
  const player = gameStore.player;

  // Ref for container, used in dragging
  const containerRef = useRef(null);

  // State for dragging
  const [dragging, setDragging] = useState(false);
  const [prevTouch, setPrevTouch] = useState(null);

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
          onTouchMove={e => {
            const touch = e.touches[0];
            const ret =
              dragging && prevTouch
                ? window.scrollTo(
                    window.scrollX - (touch.pageX - prevTouch.pageX),
                    window.scrollY - (touch.pageY - prevTouch.pageY)
                  )
                : null;
            setPrevTouch(touch);
            return ret;
          }}
        >
          <CardPreview
            card={currentCard.card}
            type={currentCard.type}
            costModifiers={player.rates.cost}
            reqModifiers={player.rates.requirement}
            showResources={currentCard.showResources}
          />
        </div>
      ) : null}

      <div className="footer">
        {currentCard.mode === 'play' &&
        myTurn /*&&
        (!gameStore.playerStatus ||
          (gameStore.playerStatus.type === 'prompt-card' &&
            gameStore.playerStatus.cardType === currentCard.type))*/ ? (
          currentCard.type === 'project' ? (
            <PlayableCard card={card} />
          ) : currentCard.type === 'prelude' ? (
            <PlayablePrelude />
          ) : null
        ) : currentCard.mode === 'action' && myTurn && card?.actions?.length ? (
          <ActionableCard card={card} />
        ) : (
          <button
            className="text-center col-1"
            onClick={() => gameStore.hideCurrentCard()}
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
    ui: PropTypes.shape({
      currentCard: PropTypes.shape({
        show: PropTypes.bool,
        card: PropTypes.object,
        type: PropTypes.string,
        mode: PropTypes.oneOf(['play', 'action', 'buy', 'draft', 'select']),
        showResources: PropTypes.bool
      }).isRequired
    }),
    turn: PropTypes.number,
    player: PropTypes.shape({
      rates: PropTypes.shape({
        cost: PropTypes.object,
        requirement: PropTypes.object
      }),
      number: PropTypes.number
    }),
    hideCurrentCard: PropTypes.func
  }).isRequired,
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(CardModal));
