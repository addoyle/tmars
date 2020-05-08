import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Lobby from './lobby/Lobby';
import Game from './game/Game';
import './App.scss';

/**
 * TMars entry point
 */
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Lobby} />
      <Route path="/game/:id" component={Game} />
    </Switch>
  </BrowserRouter>
);

export default App;
