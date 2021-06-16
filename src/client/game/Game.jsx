import React, { useEffect } from 'react';
import './Game.scss';
import Board from './components/board/Board';
import LogModel from './models/log.model';
import GameModel from './models/game.model';
import CardModel from './models/card.model';
import { Provider } from 'mobx-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faCog,
  faForward,
  faThumbsUp,
  faToggleOff,
  faToggleOn,
  faStop
} from '@fortawesome/free-solid-svg-icons';
import { subscribe, gameId } from '../util/api';

const logStore = new LogModel();
const gameStore = new GameModel();
const cardStore = new CardModel();

// Don't reset scroll on refresh
history.scrollRestoration = 'manual';

// Load up icons
library.add(faArrowAltCircleLeft);
library.add(faArrowAltCircleRight);
library.add(faArrowLeft);
library.add(faChevronUp);
library.add(faChevronDown);
library.add(faChevronRight);
library.add(faCog);
library.add(faForward);
library.add(faThumbsUp);
library.add(faToggleOn);
library.add(faToggleOff);
library.add(faStop);

/**
 * TMars entry point
 */
const Game = () => {
  // Subscribe to the game
  useEffect(() => {
    logStore.fetchLogs();

    const player = new URLSearchParams(window.location.search).get('player');

    // Get the current game
    gameStore.getGame(player);

    // Subscribe for updates
    let eventSource = subscribe(
      `game/${gameId()}/stream?player=${player}`,
      game => gameStore.update(game)
    );

    // Set page title
    document.title = `TMars - ${gameId()}`;

    return () => eventSource.close();
  }, []);

  return (
    <div className="tmars">
      <Provider {...{ logStore, gameStore, cardStore }}>
        <Board />
      </Provider>
    </div>
  );
};

export default Game;
