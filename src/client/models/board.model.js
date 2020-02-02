import { observable, action } from 'mobx';

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
    
  }
}