import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CardPreview from './CardPreview';
import { Resource, Param } from '../assets/Assets';
import classnames from 'classnames';
import './ActiveCard.scss';

const ActiveCard = props => {
  const activeCard = props.gameStore.activeCard;

  const containerRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={classnames('active-card', {
        show: activeCard.show
      })}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={e => {
        if (dragging) {
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
      ) : (
        ''
      )}
      <div className="footer">
        {['active', 'hand'].indexOf(activeCard.type) >= 0 ? (
          <button>
            <div className="flex">
              <div className="resources middle">
                <Resource name="titanium" />
              </div>
              <span className="col-1 center middle">Use Resource</span>
              <div className="pill middle">
                <span>0/2</span>
              </div>
            </div>
          </button>
        ) : null}

        <div className="flex gutter">
          {activeCard.type === 'hand' ? (
            <button className="primary col-1 disabled">
              <div className="flex">
                <div className="resources middle">
                  <Param name="card back" />
                </div>
                <span className="center middle">Play Card</span>
              </div>
            </button>
          ) : null}
          <button
            className="text-center col-1"
            onClick={() => (activeCard.show = false)}
          >
            {['active', 'hand'].indexOf(activeCard.type) >= 0
              ? 'Cancel'
              : 'Close'}
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
      resources: PropTypes.object
    }).isRequired
  }).isRequired
};

export default inject('gameStore')(observer(ActiveCard));
