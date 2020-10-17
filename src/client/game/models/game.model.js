import { observable, action } from 'mobx';
import { API, gameId } from '../../util/api';

const PLAYER_NUM = new URLSearchParams(window.location.search).get('player');

class Game {
  // Sets, or expansions, that are enabled in this game
  @observable sets = [];

  // Active drawer, or falsey to show none
  @observable drawer = 'corp';

  // Active card, shown in a popup
  @observable activeCard = {
    show: false,
    card: null,
    type: null,
    mode: null,
    steel: 0,
    titanium: 0
  };

  // Player stats popup
  @observable playerStats = {
    show: true,
    pid: +PLAYER_NUM
  };

  // Global params
  @observable params = {
    temperature: -30,
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
    torus: {
      label: 'Stanford Torus',
      set: 'promo'
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
  @observable turn;

  // Players
  @observable players = [];
  @observable player;

  @observable phase;

  @observable settings = {};

  // State of milestones and standard projects windows
  @observable showMilestones = false;
  @observable showStandardProjects = false;

  /**
   * Switch drawers. If the drawer is already open, close. Null will also close the active drawer.
   *
   * @param {string} drawer Drawer to show, or null to hide
   * @param {Event} e Original DOM event
   */
  @action
  switchDrawer(drawer, e) {
    e && e.preventDefault();

    // Clicking on the same drawer, show none
    this.drawer = this.drawer === drawer ? null : drawer;

    // Any other drawer is clicked, confirm revealed cards
    if (this.drawer !== 'reveal') {
      this.player.cards.reveal = [];
    }
  }

  /**
   * Show an active card. Note that "active" here does not correspond to Active, or blue, cards. It's referring
   * to the card that is currently displayed.
   *
   * Mode refers to the buttons that are displayed. Available modes:
   * - null: [Cancel]
   * - play: [Play, Use Steel, Use Titanium, Cancel]
   * - action: [Action 1, Action 2, ..., Cancel]
   * - buy: [Buy, Cancel]
   * - draft: [Draft, Cancel]
   *
   * @param {string} card Card number to show
   * @param {string} type Card type, one of [project, corp, prelude]
   * @param {string} mode Play mode
   */
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

  @action
  revealCards(cards) {
    this.player.cards.reveal = cards;
    this.switchDrawer('reveal');
  }

  /**
   * Update the game
   *
   * @param {Object} game The game object to update
   */
  @action
  update(game) {
    // Update the game, which will fire off a UI change
    Object.assign(this, game);

    this.player = game.players[+PLAYER_NUM - 1];

    // Update player specific UI states
    Object.assign(this, this.player.ui);
  }

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
    API(`game/${gameId()}/play-card`, 'POST', {
      ...opts,
      card,
      player: +PLAYER_NUM
    });
  }

  @action
  playPrelude(card, opts) {
    API(`game/${gameId()}/play-prelude`, 'POST', {
      ...opts,
      card,
      player: +PLAYER_NUM
    });
  }

  @action
  toggleSelectCard(card, type, opts) {
    API(`game/${gameId()}/toggle-select-card`, 'POST', {
      ...opts,
      card,
      type,
      player: +PLAYER_NUM
    });
  }

  @action
  draftCard(card, opts) {
    API(`game/${gameId()}/draft-card`, 'POST', {
      ...opts,
      card,
      player: +PLAYER_NUM
    });
  }

  @action
  buySelectedCards() {
    API(`game/${gameId()}/buy-selected`, 'POST', { player: +PLAYER_NUM });
  }

  @action
  confirmSelection(type) {
    API(`game/${gameId()}/confirm-selection/${type}`, 'POST', {
      player: +PLAYER_NUM
    });
  }

  @action
  placeTile(id) {
    API(`game/${gameId()}/place-tile/${id}`, 'POST');
  }
}

export default Game;
