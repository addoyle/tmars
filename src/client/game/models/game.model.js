import { observable, action } from 'mobx';
import { API, gameId } from '../../util/api';

class Game {
  constructor(props) {
    this.field = props.field;
  }

  // Sets, or expansions, that are enabled in this game
  @observable sets = ['corporate', 'promo', 'prelude', 'venus'];

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
    type: null,
    mode: null,
    steel: 0,
    titanium: 0
  };

  // Show an active card
  @action
  showActiveCard(card, type, mode) {
    this.activeCard = {
      ...this.activeCard,
      show: true,
      card,
      type,
      mode,
      steel: 0,
      titanium: 0
    };
  }

  // Player stats popup
  @observable playerStats = {
    show: false,
    pid: 1
  };

  // Global params
  @observable params = {
    temp: -30,
    oxygen: 0,
    ocean: 9,
    generation: 1,
    venus: 0
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
  @observable player;

  @action
  getPlayers() {
    API(`game/${gameId()}/players`).then(res => (this.players = res));
  }

  @action
  getPlayer() {
    API(`game/${gameId()}/player`).then(res => (this.player = res));
  }

  @action
  showPlayerStats(pid, player) {
    this.playerStats = { ...this.playerStats, show: true, pid, player };
  }

  @action
  playCard(card, opts) {
    API(`game/${gameId()}/play-card`, 'POST', { ...opts, card });
  }

  @action
  buyCard(card, opts) {
    API(`game/${gameId()}/buy-card`, 'POST', { ...opts, card });
  }

  @action
  update(game) {
    this.params = game.params;
    this.players = game.players;
    this.player = game.players[0];
  }
}

export default Game;
