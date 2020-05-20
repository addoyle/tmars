import React, { useEffect } from 'react';
import './Game.scss';
import Board from './components/board/Board';
import LogModel from './models/log.model';
import GameModel from './models/game.model';
import CardModel from './models/card.model';
import { Provider } from 'mobx-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Tharsis from '../../shared/boards/Tharsis';
import { subscribe, gameId } from '../util/api';

const logStore = new LogModel();
const gameStore = new GameModel({ field: Tharsis });
const cardStore = new CardModel();

// Don't reset scroll on refresh
history.scrollRestoration = 'manual';

// Load up icons
library.add(faCog);
library.add(faArrowLeft);

/**
 * TMars entry point
 */
const Game = () => {
  // Subscribe to game
  useEffect(() => {
    logStore.fetchLogs();

    let eventSource = subscribe(`game/${gameId()}/stream`, game =>
      gameStore.update(game)
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
