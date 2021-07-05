import { observable, action } from 'mobx';
import { API, gameId } from '../../util/api';
import SharedGame from '../../../shared/game/game.shared.model';
import { last } from 'lodash';

const PLAYER_NUM = new URLSearchParams(window.location.search).get('player');
const POST = 'POST';

class Game extends SharedGame {
  // Sets, or expansions, that are enabled in this game
  @observable sets = [];

  // Global params
  @observable
  params = {
    temperature: -30,
    oxygen: 0,
    ocean: 9,
    generation: 1,
    venus: 0
  };

  // The field (tiles)
  @observable field = [];
  @observable offMars = {
    ganymede: {},
    phobos: {},
    torus: {},
    maxwell: {},
    stratopolis: {},
    luna: {},
    dawn: {}
  };

  // Current player's turn
  @observable turn;

  // Players
  @observable players = [];
  @observable player;

  // Game phase
  @observable phase;

  // Game settings/menu
  @observable settings = {};

  // State of UI
  @observable ui = {
    milestones: false,
    standardProjects: false,
    drawer: 'corp',
    playerStats: {
      show: true,
      pid: +PLAYER_NUM
    },
    // Active card, shown in a popup
    currentCard: {
      show: false,
      card: null,
      type: null,
      mode: null,
      steel: 0,
      titanium: 0
    }
  };

  variants = {
    draft: false,
    wgt: false,
    trSolo: false
  };

  getField() {
    return this.field;
  }

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
    this.ui.drawer = this.ui.drawer === drawer ? null : drawer;

    // Any other drawer is clicked, confirm revealed cards
    if (this.ui.drawer !== 'reveal') {
      this.player.cards.reveal = [];
    }

    this.updateUI({ drawer: this.ui.drawer });
  }

  /**
   * Toggle if the standard project drawer is open
   */
  @action
  toggleStandardProjects() {
    this.ui.standardProjects = !this.ui.standardProjects;
    this.updateUI({ standardProjects: this.ui.standardProjects });
  }

  /**
   * Toggle if the milestone/awards drawer is open
   */
  @action
  toggleMilestoneAwards() {
    this.ui.milestones = !this.ui.milestones;
    this.updateUI({ milestones: this.ui.milestones });
  }

  /**
   * Show an active card. Note that "active" here does not correspond to Active, or blue, cards. It's referring
   * to the card that is currently displayed.
   *
   * Mode refers to the buttons that are displayed. Available modes:
   * - null: [Cancel]
   * - play: [Play, Use Steel, Use Titanium, Cancel]
   * - action: [Action 1, Action 2, ..., Cancel]
   *
   * @param {string} card Card number to show
   * @param {string} type Card type, one of [project, corp, prelude]
   * @param {string} mode Play mode
   * @param {boolean} showResources True to show resources on the card
   */
  @action
  showCurrentCard(card, type, mode, showResources) {
    this.ui.currentCard = {
      ...this.currentCard,
      show: true,
      card,
      type,
      mode,
      steel: 0,
      titanium: 0,
      heat: 0,
      showResources
    };
    this.updateUI({ currentCard: this.ui.currentCard });
  }

  @action
  hideCurrentCard() {
    this.ui.currentCard.show = false;
    this.updateUI({ currentCard: this.ui.currentCard });
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
    this.player.ui && Object.assign(this.ui, this.player.ui);

    // Set any temporary UI states from the current stack
    const action = last(this.player.actionStack);
    action && action.ui && Object.assign(this.ui, action.ui);
  }

  /**
   * Calculate the cost of a card based on modifiers
   * @param {object} card Card
   * @param {object} modifiers Cost modifiers
   */
  calculateCost(card, modifiers) {
    // Not a project card (usually a prelude)
    if (card && !card.cost) {
      return undefined;
    }

    if (card && modifiers) {
      let modifiedCost = card.cost + (modifiers.all || 0);

      // Tags
      Object.entries(modifiers).forEach(([tag, modifier]) => {
        if (card.tags.includes(tag)) {
          modifiedCost += modifier;
        }
      });

      // Requirements (Cutting Edge Technology)
      if (card.restriction) {
        modifiedCost += modifiers.requirement || 0;
      }

      return modifiedCost < 0 ? 0 : modifiedCost;
    } else {
      return card?.cost || 0;
    }
  }

  getGame(player) {
    API(`game/${gameId()}?player=${player}`).then(res => this.update(res));
  }

  @action
  showPlayerStats(pid, show) {
    this.ui.playerStats = {
      pid,
      show:
        show ?? (this.ui.playerStats.pid !== pid || !this.ui.playerStats.show)
    };

    this.updateUI();
  }

  playCard(card, opts) {
    API(`game/${gameId()}/play-card`, POST, {
      ...opts,
      card,
      player: +PLAYER_NUM
    });
  }

  playPrelude(card, opts) {
    API(`game/${gameId()}/play-prelude`, POST, {
      ...opts,
      card,
      player: +PLAYER_NUM
    });
  }

  toggleSelectCard(card, type, opts) {
    API(`game/${gameId()}/toggle-select-card`, POST, {
      ...opts,
      card,
      type,
      player: +PLAYER_NUM
    });
  }

  draftCard(opts) {
    API(`game/${gameId()}/draft-card`, POST, {
      ...opts,
      player: +PLAYER_NUM
    });
  }

  buySelectedCards() {
    API(`game/${gameId()}/buy-selected`, POST, { player: +PLAYER_NUM });
  }

  confirmSelection(type) {
    API(`game/${gameId()}/confirm-selection/${type}`, POST, {
      player: +PLAYER_NUM
    });
  }

  updateUI(ui) {
    API(`game/${gameId()}/update-ui`, POST, {
      player: +PLAYER_NUM,
      ui
    });
  }

  placeTile(id) {
    API(`game/${gameId()}/place-tile/${id}`, POST, { player: +PLAYER_NUM });
  }

  pickChoice(choice) {
    API(`game/${gameId()}/pick-choice`, POST, { choice });
  }

  passSkip() {
    API(`game/${gameId()}/pass-skip`, POST);
  }

  standardProject(project, opts = {}) {
    API(`game/${gameId()}/standard-project`, POST, {
      ...opts,
      project,
      player: +PLAYER_NUM
    });
  }

  cardAction(card, index, count) {
    API(`game/${gameId()}/card-action`, POST, {
      card,
      index,
      player: +PLAYER_NUM,
      count
    });
  }

  claimMilestone(milestone) {
    API(`game/${gameId()}/milestone`, POST, {
      milestone,
      player: +PLAYER_NUM
    });
  }

  fundAward(award) {
    API(`game/${gameId()}/award`, POST, {
      award,
      player: +PLAYER_NUM
    });
  }
}

export default Game;
