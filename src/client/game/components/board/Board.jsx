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

// prettier-ignore
const nonFocusingKeys = new Set(['Control', 'Shift', 'Alt', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'Tab',
  'CapsLock', 'PageUp', 'PageDown', 'Home', 'End', 'Insert', 'NumLock', 'Meta', 'Pause', 'ScrollLock', 'Escape',
  'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);

const Board = props => {
  const [dragging, setDragging] = useState(false);
  const [highlights, setHighlights] = useState(false);

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
      if (
        (navigator.userAgent.indexOf('Mac OS X' >= 0) && e.metaKey) ||
        e.ctrlKey
      ) {
        setHighlights(true);

        // Hide/show hand
        if (e.key === 'h') {
          e.preventDefault();
          this.handDrawer.current.toggleCollapse();
        }
        // Hide/show Actives
        if (e.key === 'a') {
          e.preventDefault();
          this.activeDrawer.current.toggleCollapse();
        }
        // Hide/show Automated
        if (e.key === 'u') {
          e.preventDefault();
          this.automatedDrawer.current.toggleCollapse();
        }
        // Hide/show Events
        if (e.key === 'e') {
          e.preventDefault();
          this.eventDrawer.current.toggleCollapse();
        }
        // Hide/show Corp
        if (e.key === 'r') {
          e.preventDefault();
          this.corpDrawer.current.toggleCollapse();
        }
        // Hide/show Standard Projects
        if (e.key === 'p') {
          e.preventDefault();
          this.standardProjects.current.toggleCollapse();
        }
        // Hide/show players
        if (+e.key >= 1 && +e.key <= this.props.boardStore.players.length) {
          e.preventDefault();
          this.players.current.toggleStats(+e.key - 1)();
        }

        // Unfocus chat
        if (e.key !== 'Control') {
          this.log.current.msg.current.blur();
        }
      }
      // If a letter is pressed, grab focus to chat
      else if (!nonFocusingKeys.has(e.key)) {
        logRef.current.focus();
      }
    };

    // Handle keyup
    const keyup = () => setHighlights(false);

    // Attach events
    document.addEventListener('mouseout', mouseout, false);
    document.addEventListener('keydown', keydown, false);
    document.addEventListener('keyup', keyup);

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
      document.removeEventListener('keyup', keyup, false);
    };
  }, []);

  return (
    <div
      className={classNames('board', {
        dragging: dragging,
        highlights: highlights
      })}
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
      <Players />
      <Field />
      <GlobalParameters />
      <StandardProjects />

      <CardDrawer
        cards={['P36', 'P37', 'P38', 'P39', 'P40', 'P41', 'P42']}
        type="hand"
        tab={
          <>
            <Param name="card back" />
            <Param name="card back" />
            <Param name="card back" />
            <span>
              <span className="highlight">H</span>and
            </span>
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
            <span>
              <span className="highlight">A</span>ctive
            </span>
          </>
        }
      />
      <CardDrawer
        cards={['165', '088', '211', '159']}
        type="automated"
        tab={
          <>
            <Param name="card automated" />
            <span>
              A<span className="highlight">u</span>tomated
            </span>
          </>
        }
      />
      <CardDrawer
        cards={[]}
        type="event"
        tab={
          <>
            <Param name="card event" />
            <span>
              <span className="highlight">E</span>vent
            </span>
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
            <span>
              Co<span className="highlight">r</span>poration
            </span>
          </>
        }
      />
      <CardDrawer
        cards={['P33', 'P34', 'P35']}
        type="prelude"
        tab={
          <>
            <Param name="card prelude landscape" />
            <span>
              Prel<span className="highlight">u</span>des
            </span>
          </>
        }
      />

      <Log ref={logRef} />
    </div>
  );
};

Board.propTypes = {
  gameStore: PropTypes.shape({
    getPlayers: PropTypes.func.isRequired
  })
};

export default inject('gameStore')(observer(Board));
