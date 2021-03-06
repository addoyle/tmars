import React from 'react';
import UserModel from './models/user.model.js';
import Home from './pages/Home';
import { Provider } from 'mobx-react';
import Header from './components/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserCircle,
  faRocket,
  faGlobe,
  faClock,
  faTree,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from './components/Content.jsx';
import GameModel from './models/game.model.js';
import './Lobby.scss';

const userStore = new UserModel();
const gameStore = new GameModel();

// Load up icons
library.add(faUserCircle);
library.add(faRocket);
library.add(faGlobe);
library.add(faClock);
library.add(faTree);
library.add(faTrashAlt);

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: '#ca834e', contrastText: '#fdf0e0' }
  },
  typography: {
    h6: {
      fontFamily: 'Prototype'
    }
  }
});

const Lobby = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="lobby">
      <Provider {...{ userStore, gameStore }}>
        <Header />

        <Content>
          <Home />
        </Content>
      </Provider>
    </div>
  </ThemeProvider>
);

export default Lobby;
