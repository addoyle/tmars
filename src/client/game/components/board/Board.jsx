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
        cards={[
          '213',
          '214',
          '215',
          '216',
          'P36',
          'P37',
          'P38',
          'P39',
          'P40',
          'P41',
          'P42'
        ]}
        type="hand"
        tab={
          <>
            <Param name="card back" />
            <Param name="card back" />
            <Param name="card back" />
            <span>Hand</span>
          </>
        }
      />
      <CardDrawer
        cards={[
          { card: '212', resources: { type: 'animal', value: 2 } },
          { card: '035', resources: { type: 'microbe', value: 3 } },
          { card: '028', resources: { type: 'fighter', value: 1 } }
        ]}
        type="active"
        tab={
          <>
            <Param name="card active" />
            <span>Active</span>
          </>
        }
      />
      <CardDrawer
        cards={['165', '088', '211', '159']}
        type="automated"
        tab={
          <>
            <Param name="card automated" />
            <span>Automated</span>
          </>
        }
      />
      <CardDrawer
        cards={[]}
        type="event"
        tab={
          <>
            <Param name="card event" />
            <span>Event</span>
          </>
        }
      />
      <CardDrawer
        //cards={this.props.boardStore.players.length ? [this.props.boardStore.players[0].corp] : []}
        cards={['P05']}
        type="corp"
        tab={
          <>
            <Param name="card corp landscape" />
            <span>Corporation</span>
          </>
        }
      />
      <CardDrawer
        cards={['P33', 'P34', 'P35']}
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
    switchDrawer: PropTypes.func.isRequired,
    activeCard: PropTypes.shape({
      show: PropTypes.bool
    })
  })
};

export default inject('gameStore')(observer(Board));
