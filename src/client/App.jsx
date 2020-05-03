import React from 'react';
import './App.scss';
import Board from './game/components/board/Board';
import LogModel from './game/models/log.model';
import GameModel from './game/models/game.model';
import CardModel from './game/models/card.model';
import { Provider } from 'mobx-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Tharsis from '../shared/boards/Tharsis';

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
const App = () => (
  <div className="App">
    <Provider {...{ logStore, gameStore, cardStore }}>
      <Board />
    </Provider>
  </div>
);

export default App;
