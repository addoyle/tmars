import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Param from '../../assets/Param';

const PlayablePrelude = ({ gameStore }) => {
  const currentCard = gameStore.currentCard;

  return (
    <div className="flex gutter">
      <button
        className="primary text-center col-1"
        onClick={() => {
          gameStore.playPrelude(currentCard.card);
          currentCard.show = false;
        }}
      >
        <div className="flex">
          <div className="resources middle">
            <Param name="card prelude landscape" />
          </div>
          <div className="center middle">Play</div>
        </div>
      </button>

      <button
        className="text-center col-1"
        onClick={() => (currentCard.show = false)}
      >
        Cancel
      </button>
    </div>
  );
};

PlayablePrelude.propTypes = {
  gameStore: PropTypes.shape({
    currentCard: PropTypes.shape({
      card: PropTypes.object,
      show: PropTypes.bool
    }).isRequired,
    playPrelude: PropTypes.func
  })
};

export default inject('gameStore')(observer(PlayablePrelude));