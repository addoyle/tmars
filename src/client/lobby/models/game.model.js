import { API } from '../../util/api';
import { makeAutoObservable } from 'mobx';

class GameModel {
  games = [];

  constructor() {
    makeAutoObservable(this);
  }

  getGames() {
    API('game/games').then(res => (this.games = res));
  }

  createGame(game) {
    API(`game/${game.id}/create`, 'POST', {
      ...game
    });
  }

  deleteGame(id) {
    API(`game/${id}`, 'DELETE');
  }
}

export default GameModel;
