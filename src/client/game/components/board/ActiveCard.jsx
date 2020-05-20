import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CardPreview from './CardPreview';
import classnames from 'classnames';
import './ActiveCard.scss';
import { Param, MegaCredit, Resource } from '../assets/Assets';

/**
 * Component for showing currently selected card
 *
 * @component
 */
const ActiveCard = props => {
  const activeCard = props.gameStore.activeCard;

  // Ref for container, used in dragging
  const containerRef = useRef(null);

  // State for dragging
  const [dragging, setDragging] = useState(false);

  const card = props.cardStore.get(activeCard.type, activeCard.card);
  const maxSteel = Math.min(
    Math.ceil(card?.cost / 2),
    props.gameStore.player?.resources.steel
  );
  const maxTitanium = Math.min(
    Math.ceil(card?.cost / 3),
    props.gameStore.player?.resources.titanium
  );

  return (
    <div
      className={classnames('active-card', {
        show: activeCard.show
      })}
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
      ref={containerRef}
    >
      {activeCard.card ? (
        <CardPreview card={activeCard.card} type={activeCard.type} />
      ) : null}
      <div className="footer">
        {activeCard.mode === 'play' && card.tags.includes('building') ? (
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
        {activeCard.mode === 'play' && card.tags.includes('space') ? (
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
        <div className="flex gutter">
          {activeCard.mode === 'play' ? (
            <button
              className="primary text-center col-1"
              onClick={() =>
                props.gameStore.playCard(activeCard.card, {
                  steel: activeCard.steel,
                  titanium: activeCard.titanium
                })
              }
            >
              <div className="flex">
                <div className="resources middle">
                  <Param name="card back" />
                </div>
                <div className="center middle">Fund</div>
                <div className="resources middle">
                  <MegaCredit
                    value={Math.max(
                      0,
                      card.cost - 2 * activeCard.steel - 3 * activeCard.titanium
                    )}
                  />
                </div>
              </div>
            </button>
          ) : null}
          <button
            className="text-center col-1"
            onClick={() => (activeCard.show = false)}
          >
            {['active', 'hand'].includes(activeCard.type) ? 'Cancel' : 'Close'}
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
      card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
      resources: PropTypes.object,
      mode: PropTypes.oneOf(['play', 'action', 'buy', 'draft']),
      steel: PropTypes.number,
      titanium: PropTypes.number
    }).isRequired,
    playCard: PropTypes.func,
    player: PropTypes.shape({
      resources: PropTypes.shape({
        steel: PropTypes.number,
        titanium: PropTypes.number
      })
    })
  }).isRequired,
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(ActiveCard));
