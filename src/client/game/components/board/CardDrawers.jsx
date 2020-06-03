import React from 'react';
import PropTypes from 'prop-types';
import CardDrawer from './CardDrawer';
import './CardDrawers.scss';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Param, MegaCredit } from '../assets/Assets';
import classnames from 'classnames';

const CardDrawers = props => {
  const drawers = [
    {
      type: 'hand',
      tab: (
        <>
          <div className="hand">
            <Param name="card back" />
            <Param name="card back" />
            <Param name="card back" />
          </div>
          <span>Hand</span>
        </>
      ),
      mode:
        props.gameStore.phase === 'action' &&
        props.gameStore.turn ===
          new URLSearchParams(window.location.search).get('player')
          ? 'play'
          : null
    },
    {
      type: 'active',
      tab: (
        <>
          <Param name="card active" />
          <span>Active</span>
        </>
      ),
      mode: props.gameStore.phase === 'action' ? 'action' : null
    },
    {
      type: 'automated',
      tab: (
        <>
          <Param name="card automated" />
          <span>Automated</span>
        </>
      )
    },
    {
      type: 'event',
      tab: (
        <>
          <Param name="card event" />
          <span>Event</span>
        </>
      )
    },
    {
      type: 'corp',
      tab: (
        <>
          <Param name="card corp landscape" />
          <span>Corporation</span>
        </>
      ),
      mode:
        props.gameStore.phase === 'action'
          ? 'action'
          : props.gameStore.phase === 'start'
          ? 'select'
          : null,
      max: 1,
      min: 1
    },
    {
      type: 'prelude',
      tab: (
        <>
          <Param name="card prelude landscape" />
          <span>Preludes</span>
        </>
      ),
      mode: props.gameStore.phase === 'start' ? 'select' : null,
      hidden: !props.gameStore.sets.includes('prelude'),
      max: 2,
      min: 2
    },
    {
      type: 'buy',
      tab: (
        <>
          <MegaCredit />
          <span>Buy</span>
        </>
      ),
      mode: 'buy',
      hidden:
        props.gameStore.phase !== 'draft' &&
        !props.gameStore.player?.cards.buy.length
    },
    {
      type: 'draft',
      tab: (
        <>
          <FontAwesomeIcon
            fixedWidth
            icon={`arrow-alt-circle-${
              ['left', 'right'][props.gameStore.params.generation % 2]
            }`}
          />
          <span>Draft</span>
        </>
      ),
      mode: 'draft',
      hidden: props.gameStore.phase !== 'draft'
    }
  ];

  return (
    <div className="drawers">
      <div className="tabs">
        {drawers
          .filter(drawer => !drawer.hidden)
          .map(drawer => (
            <div
              key={`drawer-tab-${drawer.type}`}
              className={classnames('drawer-btn', {
                open: props.gameStore.drawer === drawer.type,
                empty: !props.gameStore.player?.cards[drawer.type]?.length
              })}
              onClick={() => props.gameStore.switchDrawer(drawer.type)}
            >
              {drawer.tab}
            </div>
          ))}
      </div>
      {drawers
        .filter(drawer => !drawer.hidden)
        .map(drawer => (
          <CardDrawer
            key={`drawer-${drawer.type}`}
            collapse={props.gameStore.drawer !== drawer.type}
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
        )
      })
    })
  })
};

export default inject('gameStore')(observer(CardDrawers));
