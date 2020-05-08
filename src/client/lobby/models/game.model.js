// import { API } from '../../util/api';

import { observable } from 'mobx';

class GameModel {
  @observable publicGames = [
    {
      name: 'Spiffy Game',
      id: 'beefbeef-beef-beef-beef-beefbeefbeef',
      sets: ['corporate', 'promo', 'prelude', 'venus'],
      started: true,
      board: 'Tharsis',
      drafting: true,
      wgt: true,
      generation: 4,
      max: 5,
      players: 4
    },
    {
      name: 'Lame Game',
      id: 'c0d3c0d3-c0d3-c0d3-c0d3-c0d3c0d3c0d3',
      sets: ['corporate', 'promo'],
      started: false,
      board: 'Hellas',
      drafting: true,
      wgt: false,
      max: 5,
      players: 2
    },
    {
      name: 'Full Game',
      id: 'cafecafec-cafe-cafe-cafe-cafecafecafe',
      sets: ['corporate', 'promo', 'prelude'],
      started: false,
      board: 'Elysium',
      drafting: false,
      wgt: true,
      max: 5,
      players: 5
    }
  ];
  @observable activeGames = [];
}

export default GameModel;
