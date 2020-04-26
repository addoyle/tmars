import React from 'react';
import './App.scss';
import Board from './game/components/board/Board';
import LogModel from './game/models/log.model';
import GameModel from './game/models/game.model';
import CardModel from './game/models/card.model';
import { Provider } from 'mobx-react';
import Tharsis from './game/components/assets/boards/Tharsis';

const logStore = new LogModel();
const gameStore = new GameModel({ field: Tharsis });
const cardStore = new CardModel();

// Don't reset scroll on refresh
history.scrollRestoration = 'manual';

/**
 * TMars entry point
 */
const App = () => (
  <div className="App">
    <Provider {...{ logStore, gameStore, cardStore }}>
      <Board />
    </Provider>
  </div>
);

export default App;
