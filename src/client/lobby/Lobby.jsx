import React from 'react';
import UserModel from './models/user.model.js';
import Home from './pages/Home';
import { Provider } from 'mobx-react';
import Header from './components/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const userStore = new UserModel();
userStore.name = 'Andy';

// Load up icons
library.add(faUserCircle);

const Lobby = () => (
  <div className="lobby">
    <Provider {...{ userStore }}>
      <Header />
      <Home />
    </Provider>
  </div>
);

export default Lobby;
