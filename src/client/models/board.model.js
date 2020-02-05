import { observable, action } from 'mobx';
import { API } from '../util/api';

export default class Board {
  @observable params = {
    temp: -30,
    oxygen: 0,
    ocean: 9,
    generation: 1
  };
  
  @observable turn = 4;
  @observable players = [];

  @action
  getPlayers() {
    API('players').then(res => {
      console.log(res);
      this.players = res;
    });
  }
} 