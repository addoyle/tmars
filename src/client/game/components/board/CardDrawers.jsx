import React from 'react';
import PropTypes from 'prop-types';
import CardDrawer from './CardDrawer';
import './CardDrawers.scss';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Param, MegaCredit } from '../assets/Assets';
import classnames from 'classnames';

const CardDrawers = ({ gameStore }) => {
  const drawers = [
    // Hand of cards
    {
      type: 'hand',
      tab: (
        <>
          <div className="hand">
            <Param name="card back" />
            <Param name="card back" />
            <Param name="card back" />
          </div>
          <span>
            Hand
            {gameStore.player ? (
              <span className="card-count">
                {gameStore.player.cards.hand.length}
              </span>
            ) : null}
          </span>
        </>
      ),
      mode:
        (gameStore.phase === 'action' ||
          (gameStore.phase === 'prelude' &&
            gameStore.playerStatus?.modifiers)) &&
        gameStore.turn === gameStore.player?.number
          ? 'play'
          : null
    },

    // Active (blue) cards
    {
      type: 'active',
      tab: (
        <>
          <Param name="card active" />
          <span>
            Active
            {gameStore.player ? (
              <span className="card-count">
                {gameStore.player.cards.active.length}
              </span>
            ) : null}
          </span>
        </>
      ),
      mode: gameStore.phase === 'action' ? 'action' : null
    },

    // Automated (green) cards
    {
      type: 'automated',
      tab: (
        <>
          <Param name="card automated" />
          <span>
            Automated
            {gameStore.player ? (
              <span className="card-count">
                {gameStore.player.cards.automated.length}
              </span>
            ) : null}
          </span>
        </>
      )
    },

    // Event (red) cards
    {
      type: 'event',
      tab: (
        <>
          <Param name="card event" />
          <span>
            Event
            {gameStore.player ? (
              <span className="card-count">
                {gameStore.player.cards.event.length}
              </span>
            ) : null}
          </span>
        </>
      )
    },

    // Corporation
    {
      type: 'corp',
      tab: (
        <>
          <Param name="card corp landscape" />
          <span>Corporation</span>
        </>
      ),
      mode:
        gameStore.phase === 'action'
          ? 'action'
          : gameStore.phase === 'start' &&
            gameStore.player?.cards.corp.length !== 1
          ? 'select'
          : null,
      max: 1,
      min: 1
    },

    // Preludes
    {
      type: 'prelude',
      tab: (
        <>
          <Param name="card prelude landscape" />
          <span>Preludes</span>
        </>
      ),
      mode:
        gameStore.phase === 'prelude'
          ? 'play'
          : gameStore.phase === 'start' &&
            gameStore.player?.cards.prelude.length !== 2
          ? 'select'
          : null,
      hidden: !gameStore.sets.includes('prelude'),
      max: 2,
      min: 2
    },

    // Cards available to buy
    {
      type: 'buy',
      tab: (
        <>
          <MegaCredit />
          <span>
            Buy
            {gameStore.player ? (
              <span className="card-count">
                {gameStore.player.cards.buy.length}
              </span>
            ) : null}
          </span>
        </>
      ),
      mode: 'buy',
      hidden: gameStore.phase !== 'draft' && !gameStore.player?.cards.buy.length
    },

    // Cards to draft
    {
      type: 'draft',
      tab: (
        <>
          <FontAwesomeIcon
            fixedWidth
            icon={`arrow-alt-circle-${
              ['left', 'right'][gameStore.params.generation % 2]
            }`}
          />
          <span>
            Draft
            {gameStore.player ? (
              <span className="card-count">
                {gameStore.player.cards.draft.length}
              </span>
            ) : null}
          </span>
        </>
      ),
      mode: 'draft',
      hidden: gameStore.phase !== 'draft'
    },

    // Cards revealed during a tag search
    {
      type: 'reveal',
      tab: (
        <>
          <FontAwesomeIcon icon="thumbs-up" />
          <span>
            Ok
            {gameStore.player ? (
              <span className="card-count">
                {gameStore.player.cards.reveal?.length}
              </span>
            ) : null}
          </span>
        </>
      ),
      hidden: !gameStore.player?.cards.reveal?.length,
      closable: true
    }
  ];

  return (
    <div className="drawers">
      <div className="tabs">
        {drawers.map(drawer => (
          <div
            key={`drawer-tab-${drawer.type}`}
            className={classnames('drawer-btn', {
              open: gameStore.drawer === drawer.type,
              empty: !gameStore.player?.cards[drawer.type]?.length,
              hidden: drawer.hidden
            })}
            onClick={() => gameStore.switchDrawer(drawer.type)}
          >
            {drawer.tab}
          </div>
        ))}
      </div>
      {drawers.map(drawer => (
        <CardDrawer
          key={`drawer-${drawer.type}`}
          collapse={gameStore.drawer !== drawer.type}
          {...drawer}
        />
      ))}
    </div>
  );
};

CardDrawers.propTypes = {
  gameStore: PropTypes.shape({
    switchDrawer: PropTypes.func.isRequired,
    drawer: PropTypes.string,
    sets: PropTypes.arrayOf(PropTypes.string),
    phase: PropTypes.string,
    turn: PropTypes.number,
    activeCard: PropTypes.shape({
      show: PropTypes.bool
    }),
    params: PropTypes.shape({
      generation: PropTypes.number
    }),
    playerStatus: PropTypes.shape({
      modifiers: PropTypes.object
    }),
    player: PropTypes.shape({
      cards: PropTypes.shape({
        hand: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        automated: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        active: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        event: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        corp: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        prelude: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        draft: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        buy: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        ),
        reveal: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        )
      })
    })
  })
};

export default inject('gameStore')(observer(CardDrawers));
