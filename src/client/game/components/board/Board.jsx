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
import CardDrawers from './CardDrawers';
import classNames from 'classnames';
import CardModal from './card-modal/CardModal';
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
        props.gameStore.currentCard.show = false;
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

    // Cleanup
    return () => {
      document.removeEventListener('mouseout', mouseout, false);
      document.removeEventListener('keydown', keydown, false);
    };
  }, []);

  return (
    <div
      className={classNames('board', props.gameStore.board?.toLowerCase(), {
        dragging
      })}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={e =>
        dragging
          ? window.scrollTo(
              window.scrollX - e.movementX,
              window.scrollY - e.movementY
            )
          : null
      }
      ref={boardContainer}
    >
      <Field />
      <GlobalParameters />
      <Players />
      {props.gameStore.players.length > 1 ? <MilestoneAward /> : null}
      <StandardProjects />
      <CardModal />
      <Log ref={logRef} />
      <CardDrawers />
      <Settings />
    </div>
  );
};

Board.propTypes = {
  gameStore: PropTypes.shape({
    currentCard: PropTypes.shape({
      show: PropTypes.bool
    }),
    board: PropTypes.string,
    players: PropTypes.array
  })
};

export default inject('gameStore', 'cardStore')(observer(Board));
