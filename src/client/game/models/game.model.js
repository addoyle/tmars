import { observable, action } from 'mobx';
import { API, gameId } from '../../util/api';

class Game {
  constructor(props) {
    this.field = props.field;
  }

  // Sets, or expansions, that are enabled in this game
  @observable sets = ['corporate', 'promo', 'prelude', 'venus'];

  // Active drawer, or falsey to show none
  @observable drawer = 'buy';

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
  getGame(player) {
    API(`game/${gameId()}?player=${player}`).then(res => this.update(res));
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
  draftCard(card, opts) {
    API(`game/${gameId()}/draft-card`, 'POST', { ...opts, card });
  }

  @action
  discardUnbought() {
    API(`game/${gameId()}/discard-unbought`, 'POST');
  }

  @action
  update(game) {
    this.params = game.params;
    this.players = game.players;
    this.player =
      game.players[
        new URLSearchParams(window.location.search).get('player') - 1
      ];
  }
}

export default Game;
