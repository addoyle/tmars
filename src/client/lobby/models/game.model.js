import { API } from '../../util/api';

import { action, observable } from 'mobx';

class GameModel {
  @observable games = [];

  @action
  getGames() {
    API('game/games').then(res => (this.games = res));
  }

  @action
  createGame(game) {
    API(`game/${game.id}/create`, 'POST', {
      ...game
    });
  }
}

export default GameModel;
