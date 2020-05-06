import { observable, action } from 'mobx';
import { API } from '../../util/api';

class Game {
  constructor(props) {
    this.field = props.field;
  }

  // Sets, or expansions, that are enabled in this game
  @observable sets = ['corporate', 'prelude', 'venus'];

  // Active drawer, or falsey to show none
  @observable drawer = 'hand';

  // Switch drawers
  @action
  switchDrawer(drawer, e) {
    e && e.preventDefault();

    // Clicking on the same drawer, show none
    this.drawer = this.drawer === drawer ? null : drawer;
  }

  // Active card, shown in a popup
  @observable activeCard = {
    show: false,
    card: null,
    type: null
  };

  // Show an active card
  @action
  showActiveCard(card, type) {
    this.activeCard = { ...this.activeCard, show: true, card, type };
  }

  // Player stats popup
  @observable playerStats = {
    show: false,
    pid: 1,
    player: null
  };

  // Global params
  @observable params = {
    temp: -30,
    oxygen: 0,
    ocean: 9,
    generation: 1
  };

  // The field (tiles)
  @observable field = [];
  @observable detachedCities = {
    ganymede: {
      label: 'Ganymede Colony'
    },
    phobos: {
      label: 'Phobos Space Haven'
    },
    maxwell: {
      label: 'Maxwell Base',
      set: 'venus'
    },
    stratopolis: {
      label: 'Stratopolis',
      set: 'venus'
    },
    luna: {
      label: 'Luna Metropolis',
      set: 'venus'
    },
    dawn: {
      label: 'Dawn City',
      set: 'venus'
    }
  };

  // Current player's turn
  @observable turn = 4;

  // Players
  @observable players = [];

  @action
  getPlayers() {
    API('players').then(res => {
      this.players = res;
    });
  }

  @action
  showPlayerStats(pid, player) {
    this.playerStats = { ...this.playerStats, show: true, pid, player };
  }
}

export default Game;
