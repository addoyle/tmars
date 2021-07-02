import React from 'react';
import PropTypes from 'prop-types';
import CardDrawer from './CardDrawer';
import './CardDrawers.scss';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Param } from '../assets/Assets';
import classnames from 'classnames';
import { last } from 'lodash';

const CardDrawers = ({ gameStore }) => {
  const buyMode =
    gameStore.player?.cards.buy.length &&
    (gameStore.phase !== 'research' ||
      (gameStore.phase === 'research' &&
        gameStore.player?.cards.buy.length === 4));

  const latestAction = last(gameStore.player?.actionStack);

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
      extraClasses: buyMode && ['buy-mode'],
      mode:
        (gameStore.phase === 'action' ||
          (gameStore.phase === 'prelude' &&
            latestAction?.type === 'prompt-card' &&
            latestAction?.mode === 'play')) &&
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

    // Cards to draft
    {
      type: 'draft',
      tab: (
        <>
          <Param name="card back" />
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
      hidden:
        gameStore.phase !== 'research' ||
        gameStore.player?.cards.buy.length === 4,
      max: 1,
      min: 1
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
    },

    // Cards that an action is to be performed against
    {
      type: 'chooser',
      tab: (
        <>
          <Param name="card back" />
          <span>
            Cards
            {gameStore.player ? (
              <span className="card-count">
                {latestAction?.cards
                  ? Object.values(latestAction.cards).flat().length
                  : 0}
              </span>
            ) : null}
          </span>
        </>
      ),
      hidden:
        latestAction?.type !== 'prompt-card' || latestAction?.mode === 'play',
      closable: true
    }
  ];

  return (
    <div className="drawers">
      <div className="tabs">
        {drawers.map(drawer => (
          <div
            key={`drawer-tab-${drawer.type}`}
            className={classnames(
              'drawer-btn',
              ...(drawer.extraClasses || []),
              {
                open: gameStore.ui.drawer === drawer.type,
                empty: !gameStore.player?.cards[drawer.type]?.length,
                hidden: drawer.hidden
              }
            )}
            onClick={() => gameStore.switchDrawer(drawer.type)}
          >
            {drawer.tab}
          </div>
        ))}
      </div>
      {drawers.map(drawer => (
        <CardDrawer
          key={`drawer-${drawer.type}`}
          collapse={gameStore.ui.drawer !== drawer.type}
          {...drawer}
        />
      ))}
    </div>
  );
};

CardDrawers.propTypes = {
  gameStore: PropTypes.shape({
    switchDrawer: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      drawer: PropTypes.string
    }),
    sets: PropTypes.arrayOf(PropTypes.string),
    phase: PropTypes.string,
    turn: PropTypes.number,
    currentCard: PropTypes.shape({
      show: PropTypes.bool
    }),
    params: PropTypes.shape({
      generation: PropTypes.number
    }),
    player: PropTypes.shape({
      cards: PropTypes.shape({
        hand: PropTypes.arrayOf(PropTypes.object),
        automated: PropTypes.arrayOf(PropTypes.object),
        active: PropTypes.arrayOf(PropTypes.object),
        event: PropTypes.arrayOf(PropTypes.object),
        corp: PropTypes.arrayOf(PropTypes.object),
        prelude: PropTypes.arrayOf(PropTypes.object),
        draft: PropTypes.arrayOf(PropTypes.object),
        buy: PropTypes.arrayOf(PropTypes.object),
        reveal: PropTypes.arrayOf(PropTypes.object)
      }),
      actionStack: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          cards: PropTypes.array
        })
      ),
      number: PropTypes.number
    })
  })
};

export default inject('gameStore')(observer(CardDrawers));
