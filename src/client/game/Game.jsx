import React, { useEffect } from 'react';
import './Game.scss';
import Board from './components/board/Board';
import LogModel from './models/log.model';
import GameModel from './models/game.model';
import CardModel from './models/card.model';
import { Provider } from 'mobx-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faSearchPlus,
  faArrowLeft,
  faChevronUp,
  faChevronDown,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faThumbsUp,
  faToggleOff,
  faToggleOn
} from '@fortawesome/free-solid-svg-icons';
import { subscribe, gameId } from '../util/api';

const logStore = new LogModel();
const gameStore = new GameModel();
const cardStore = new CardModel();

// Don't reset scroll on refresh
history.scrollRestoration = 'manual';

// Load up icons
library.add(faCog);
library.add(faSearchPlus);
library.add(faArrowLeft);
library.add(faChevronUp);
library.add(faChevronDown);
library.add(faArrowAltCircleLeft);
library.add(faArrowAltCircleRight);
library.add(faThumbsUp);
library.add(faToggleOn);
library.add(faToggleOff);

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
