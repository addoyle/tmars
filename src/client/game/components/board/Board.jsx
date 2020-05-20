import React, { useEffect, useState, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './Board.scss';
import '../assets/Assets.scss';
import Field from './Field';
import Players from './players/Players';
import Log from './Log';
import GlobalParameters from './params/GlobalParameters';
import StandardProjects from './StandardProjects';
import CardDrawer from './CardDrawer';
import { Param } from '../assets/Assets';
import classNames from 'classnames';
import ActiveCard from './ActiveCard';
import MilestoneAward from './MilestoneAward';
import Settings from './Settings';

// prettier-ignore
const nonFocusingKeys = new Set(['Control', 'Shift', 'Alt', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'Tab',
  'CapsLock', 'PageUp', 'PageDown', 'Home', 'End', 'Insert', 'NumLock', 'Meta', 'Pause', 'ScrollLock', 'Escape',
  'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);

const Board = props => {
  const [dragging, setDragging] = useState(false);

  const boardContainer = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    // Handle if dragging leaves the browser window
    const mouseout = e => {
      e = e ? e : window.event;
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        setDragging(false);
      }
    };

    // Handle keydown shortcuts
    const keydown = e => {
      if (!nonFocusingKeys.has(e.key)) {
        logRef.current.focus();
      }

      if (e.key === 'Escape') {
        props.gameStore.activeCard.show = false;
      }
    };

    // Attach events
    document.addEventListener('mouseout', mouseout, false);
    document.addEventListener('keydown', keydown, false);

    // Start in middle
    window.scrollTo(
      (boardContainer.current.scrollWidth - window.innerWidth) / 2,
      (boardContainer.current.scrollHeight - window.innerHeight) / 2
    );

    // Load the players
    props.gameStore.getPlayers();
    props.gameStore.getPlayer();

    // Cleanup
    return () => {
      document.removeEventListener('mouseout', mouseout, false);
      document.removeEventListener('keydown', keydown, false);
    };
  }, []);

  return (
    <div
      className={classNames('board', { dragging: dragging })}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={e => {
        dragging
          ? window.scrollTo(
              window.scrollX - e.movementX,
              window.scrollY - e.movementY
            )
          : null;
      }}
      ref={boardContainer}
    >
      <Field />
      <Players />
      <GlobalParameters />
      <MilestoneAward />
      <StandardProjects />
      <ActiveCard />
      <Settings />
      <CardDrawer
        cards={props.gameStore.player?.cards.hand || []}
        type="hand"
        tab={
          <>
            <Param name="card back" />
            <Param name="card back" />
            <Param name="card back" />
            <span>Hand</span>
          </>
        }
        mode="play"
      />
      <CardDrawer
        cards={props.gameStore.player?.cards.active || []}
        type="active"
        tab={
          <>
            <Param name="card active" />
            <span>Active</span>
          </>
        }
        mode="action"
      />
      <CardDrawer
        cards={props.gameStore.player?.cards.automated || []}
        type="automated"
        tab={
          <>
            <Param name="card automated" />
            <span>Automated</span>
          </>
        }
      />
      <CardDrawer
        cards={props.gameStore.player?.cards.event || []}
        type="event"
        tab={
          <>
            <Param name="card event" />
            <span>Event</span>
          </>
        }
      />
      <CardDrawer
        cards={
          props.gameStore.player?.corp ? [props.gameStore.player.corp] : []
        }
        type="corp"
        tab={
          <>
            <Param name="card corp landscape" />
            <span>Corporation</span>
          </>
        }
      />
      <CardDrawer
        cards={props.gameStore.player?.cards.prelude || []}
        type="prelude"
        tab={
          <>
            <Param name="card prelude landscape" />
            <span>Preludes</span>
          </>
        }
      />

      <Log ref={logRef} />
    </div>
  );
};

Board.propTypes = {
  gameStore: PropTypes.shape({
    getPlayers: PropTypes.func.isRequired,
    getPlayer: PropTypes.func.isRequired,
    switchDrawer: PropTypes.func.isRequired,
    activeCard: PropTypes.shape({
      show: PropTypes.bool
    }),
    playCard: PropTypes.func,
    player: PropTypes.shape({
      corp: PropTypes.string,
      cards: PropTypes.shape({
        hand: PropTypes.arrayOf(PropTypes.string),
        automated: PropTypes.arrayOf(PropTypes.string),
        active: PropTypes.arrayOf(PropTypes.string),
        event: PropTypes.arrayOf(PropTypes.string),
        prelude: PropTypes.arrayOf(PropTypes.string)
      })
    })
  }),
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(Board));
