import {
  shuffle,
  isString,
  isFunction,
  startCase,
  groupBy,
  isPlainObject,
  times,
  last
} from 'lodash';
import Tharsis from '../../shared/boards/Tharsis';
import Hellas from '../../shared/boards/Hellas';
import Elysium from '../../shared/boards/Elysium';
import Log from './log.model';
import LogService from '../services/log.service';
import SharedGame from '../../shared/game/game.shared.model';
import Player from './player.model';

const paramStats = {
  temperature: {
    start: -30,
    max: 8,
    step: 2,
    rewards: {
      [-24]: (player, game) => game.production(player, 'heat', 1),
      [-20]: (player, game) => game.production(player, 'heat', 1),
      0: (player, game, done) => game.promptTile(player, 'ocean', done)
    }
  },
  oxygen: {
    max: 14,
    rewards: {
      8: (player, game, done) => game.param(player, 'temperature', done)
    }
  },
  venus: {
    max: 30,
    step: 2,
    rewards: {
      8: (player, game) => game.drawCard(player),
      16: (player, game) => game.tr(player, 1)
    }
  },
  ocean: {
    max: 0,
    step: -1,
    start: 9,
    rewards: {}
  }
};

class Game extends SharedGame {
  id;
  sets = [];
  players = [];
  turn = 0;
  startingPlayer = 0;
  params = {
    temperature: -30,
    oxygen: 0,
    ocean: 9,
    generation: 1,
    venus: 0
  };
  variants = {
    draft: false,
    wgt: false,
    trSolo: false
  };
  board = 'Tharsis';
  field = [];
  milestones = [];
  awards = [];
  phase = 'start';
  endGame = false;

  offMars = {
    ganymede: {},
    phobos: {},
    torus: {},
    maxwell: {},
    stratopolis: {},
    luna: {},
    dawn: {}
  };

  log = [];

  cards = {
    deck: [],
    discard: [],
    corps: [],
    preludes: []
  };
  cardStore;

  /**
   * Constructor
   * @param {CardModel} cardStore
   */
  constructor(cardStore, game) {
    super();
    this.cardStore = cardStore;

    if (game) {
      Object.assign(this, game);

      this.players = game.players.map(p => new Player(p));
    }
  }

  /**
   * Initialize the game
   */
  init() {
    // Show welcome message
    this.log.push(new Log(0, 'Welcome to Terraforming Mars!'));

    // Assign players starting stuff
    this.players.forEach((player, i) => {
      player.number = i + 1;
      player.ui.playerStats = { show: true, pid: i + 1 };
    });

    // Solo game specific rules
    if (this.players.length === 1) {
      const player = this.players[0];

      // Starting TR at 14
      player.tr = 14;

      // Solo games always play with corporate era
      if (!this.sets.includes('corporate')) {
        this.sets.push('corporate');
      }
    }
    // Multi-player game rules
    else {
      this.players.forEach(player => {
        // Starting TR at 20
        player.tr = 20;

        // Non-corporate era starts with 1 production for each resource
        if (!this.sets.includes('corporate')) {
          Object.keys(player.production).forEach(
            p => (player.production[p] = 1)
          );
        }
      });
    }

    // Filter out non-used cards and shuffle project deck
    let deck = Object.values(this.cardStore.project).filter(
      card =>
        card.set === 'base' ||
        (Array.isArray(card.set) ? card.set : [card.set]).every(set =>
          this.sets.includes(set)
        )
    );
    // Remove any card that gets replaced by another (e.g. X32 replaces 136)
    const replaced = deck
      .filter(c => c.replaces)
      .reduce((r, c) => ({ ...r, [c.replaces]: c.number }), {});
    deck = deck.filter(c => !replaced[c.number]);

    // Shuffle it up and store just the ids
    this.cards.deck = shuffle(deck.map(card => ({ card: card.number })));

    this.cards.corps = shuffle(
      // Do the same for the corp deck
      Object.values(this.cardStore.corp)
        .filter(
          corp =>
            // Filter out Beginner Corp
            corp.number !== 'CORP00' &&
            (corp.set === 'base' ||
              (Array.isArray(corp.set) ? corp.set : [corp.set]).every(set =>
                this.sets.includes(set)
              ))
        )
        .map(card => ({ card: card.number }))
    );
    // And the prelude deck
    if (this.sets.includes('prelude')) {
      this.cards.preludes = shuffle(
        Object.keys(this.cardStore.prelude).map(card => ({ card }))
      );
    }

    // Set field
    this.field = { Tharsis, Elysium, Hellas }[this.board].field;

    // Assign tile ids
    let id = 0;
    this.field.forEach(row => row.forEach(t => (t.id = id++)));

    // Tell the users which field they're playing on
    this.log.push(
      new Log(0, [
        `You are terraforming **${startCase(this.board)}**, `,
        {
          tharsis: 'the volcanic province!',
          hellas: 'the southern wild!',
          elysium: 'the other side of mars!'
        }[this.board.toLowerCase()]
      ])
    );

    // Show helpful message log
    const startLog = new Log(0, [
      'Please select 1 ',
      { corp: 'Corporation', drawer: 'corp' }
    ]);
    if (this.sets.includes('prelude')) {
      startLog.body.push(', 2 ');
      startLog.body.push({ prelude: 'Preludes', drawer: 'prelude' });
      startLog.body.push(', ');
    }
    startLog.body.push('and buy cards for your ');
    startLog.body.push({ project: 'starting hand', drawer: 'hand' });
    startLog.body.push('.');
    this.log.push(startLog);

    // Choose starting player
    this.startingPlayer = Math.floor(Math.random() * this.players.length) + 1;
    this.log.push(
      new Log(this.startingPlayer, ' will be your starting player!')
    );

    // Deal out 2 corps to each player
    for (let i = 0; i < 2; i++) {
      this.forEachPlayerOrder(player =>
        player.cards.corp.push(this.cards.corps.shift())
      );
    }
    // Add in beginner corp
    // TODO: make this optional
    this.players.forEach(player => player.cards.corp.push({ card: 'CORP00' }));

    // Deal out 10 projects
    for (let i = 0; i < 10; i++) {
      this.forEachPlayerOrder(player => this.drawCard(player, 'buy'));
    }

    // Deal out 4 preludes
    if (this.sets.includes('prelude')) {
      for (let i = 0; i < 4; i++) {
        this.forEachPlayerOrder(player =>
          player.cards.prelude.push(this.cards.preludes.shift())
        );
      }
    }
  }

  playStartingAction() {
    const player = this.players[this.turn - 1];
    const corp = this.cardStore.corp[player.cards.corp[0].card];

    if (
      this.params.generation === 1 &&
      player.startingAction &&
      corp.startingAction
    ) {
      // Log the starting action
      LogService.pushLog(
        this.id,
        new Log(player.number, [
          ' performed ',
          { corp: player.cards.corp[0].card },
          "'s starting action."
        ])
      );

      // Marking starting action as complete
      player.startingAction = false;

      // Perform the action
      this.performAction(corp.startingAction, player, corp);
    }
  }

  /**
   * Draw a project card for a player
   *
   * @param {Player} player
   * @param {string} pile
   */
  drawCard(player, pile = 'hand') {
    // Shuffle the dicard pile into the draw deck if empty
    if (this.cards.deck.length === 0) {
      this.cards.deck = shuffle(this.cards.discard);
      this.cards.discard = [];
    }

    const drawnCard = this.cards.deck.shift();
    if (player && pile) {
      player.cards[pile].push(drawnCard);
    }
    return drawnCard;
  }

  /**
   * Set the corp on a player
   * @param {Player} player
   */
  applyCorp(player) {
    const corp = this.cardStore.corp[player.cards.corp[0].card];

    // Perform corp's standard action
    this.performAction(corp, player, corp);

    // Apply tags
    (corp.tags || []).forEach(tag => player.tags[tag]++);
  }

  /**
   * Draw and reveal cards until they match a particular filter
   *
   * @param {*} player Player who's drawing cards
   * @param {*} revealFilter Filter for what to draw for
   * @param {*} num How many cards needed to be found
   * @param {*} label Label to be shown (for play log)
   * @param {*} icon Icon to be shown (for play log)
   */
  revealCards(player, revealFilter, num, label, icon) {
    const reveal = [];
    let keep = [];

    // Draw cards until the number of matching cards reaches the expected size
    while (
      (keep = reveal
        .map(card => this.cardStore.get(card.card))
        .filter(revealFilter || (() => true))
        .map(card => ({ card: card.number }))).length < num
    ) {
      reveal.push(this.cards.deck.shift());
    }

    // Select the cards that will move to the hand
    if (revealFilter) {
      reveal.forEach(card => {
        if (keep.map(({ card }) => card).includes(card.card)) {
          card.select = true;
        }
      });
    }

    // Add a log for users to see revealed cards
    LogService.pushLog(
      this.id,
      new Log(player.number, [
        ` searched for ${num} `,
        icon,
        ` ${label} and has `,
        { reveal },
        '.'
      ])
    );

    return reveal;
  }

  /**
   * Put the selected cards into their hand
   *
   * @param {Player} player Player receiving the cards
   * @param {array} cards Cards to receive
   */
  keepSelected(player, cards) {
    const keep = cards
      .filter(c => c.select)
      .map(c => ({ ...c, select: false }));

    // Put selected cards in hand
    player.cards.hand = player.cards.hand.concat(keep);

    // Discard the rest
    this.cards.discard = this.cards.discard.concat(
      cards.filter(card => !card.select)
    );
  }

  /**
   * Bump up the param and give the player the rewards
   *
   * @param {Player} player Player who receives the rewards for the bump
   * @param {string} param Param to bump
   */
  param(player, param) {
    if (
      paramStats[param] !== undefined &&
      (this.params[param] < paramStats[param].max ||
        (paramStats[param].step < 0 &&
          this.params[param] > paramStats[param].max))
    ) {
      this.params[param] += paramStats[param].step || 1;
      this.tr(player, 1);

      // Handle rewards if a param reaches a certain threshold
      const rewardAction = paramStats[param].rewards[this.params[param]];
      if (rewardAction) {
        LogService.pushLog(
          this.id,
          new Log(player.number, [
            ' got a reward from raising ',
            { param },
            ` ${startCase(param)}!`
          ])
        );
        rewardAction(player, this);
      }
    }

    this.checkEndGame();
  }

  /**
   * Performs an action. The standard action is typically changing
   * resources/production, placing tiles, drawing cards, and increasing global
   * parameters (temperature, oxygen, venus), followed by any custom actions
   * defined on the card.
   *
   * @param {object} action The action object to perform
   * @param {Player} player The player performing the standard action
   * @param {object} card The associated card
   * @param {object} params Optional params passed to custom action
   */
  performAction(action, player, card, params) {
    // If the action is just a function, call it as normal
    if (isFunction(action)) {
      action(player, this, card, params);
      return;
    }

    const standardResources = [
      'megacredit',
      'steel',
      'titanium',
      'plant',
      'power',
      'heat'
    ];

    // Handle resources
    if (action.resources) {
      if (isFunction(action.resources)) {
        action.resources(player, this, params);
      } else {
        Object.keys(action.resources).forEach(r =>
          r === 'anyone'
            ? Object.entries(action.resources.anyone).forEach(([ar, val]) =>
                // Standard resource, prompt for player to remove from
                standardResources.includes(ar)
                  ? this.promptPlayer(player, card, {
                      title: val.title || 'Pick a player',
                      icon: val.icon || [
                        pp => ({ text: pp.resources[ar] }),
                        { resource: ar }
                      ],
                      logSnippet: val.log || [
                        `take ${isNaN(val) ? -val.val : -val} ${ar}`,
                        Math.abs(val.val) === 1 && ar === 'plant' ? ' ' : 's ',
                        { resource: ar },
                        ' from'
                      ],
                      filter: val.filter || (pp => pp.resources[ar] > 0),
                      action: { resources: { [ar]: val } },
                      optional: true
                    })
                  : // Card resource, prompt for a player's card
                    this.promptCard(player, {
                      filter: card => card.resource === ar,
                      anyone: true,
                      action: (player, game, cards) => {
                        cards.forEach(card => {
                          // Find owner of card
                          const targetPlayer = this.players.find(p =>
                            p.allCards.map(c => c.card).includes(card.card)
                          );

                          this.cardResource(
                            targetPlayer,
                            { number: cards[0].card },
                            isFunction(action.resources.anyone[ar])
                              ? action.resources.anyone[ar](
                                  targetPlayer,
                                  this,
                                  params
                                )
                              : action.resources.anyone[ar]
                          );
                        });
                      }
                    })
              )
            : // Standard resources
            standardResources.includes(r)
            ? this.resources(
                player,
                r,
                isFunction(action.resources[r])
                  ? action.resources[r](player, this, params)
                  : action.resources[r]
              )
            : // Card resources
              this.promptCard(player, {
                filter: card => card.resource === r,
                action: (player, game, cards) =>
                  cards.forEach(card =>
                    this.cardResource(
                      player,
                      { number: card.card },
                      isFunction(action.resources[r])
                        ? action.resources[r](player, this, params)
                        : action.resources[r]
                    )
                  )
              })
        );
      }
    }

    // Handle production
    if (action.production) {
      if (isFunction(action.production)) {
        action.production(player, this);
      } else {
        Object.keys(action.production).forEach(p =>
          p === 'anyone'
            ? Object.entries(action.production.anyone).forEach(([k, v]) => {
                this.promptPlayer(player, card, {
                  title: v.title || 'Pick a player',
                  icon: v.icon || [
                    pp => ({ text: pp.production[k] }),
                    { production: k }
                  ],
                  logSnippet: v.log || [
                    `take ${isNaN(v) ? -v.val : -v} ${k} `,
                    { resource: k },
                    ' production from'
                  ],
                  filter: v.filter || (pp => pp.production[k] > 0),
                  action: { production: { [k]: v } }
                });
              })
            : this.production(
                player,
                p,
                isFunction(action.production[p])
                  ? action.production[p](player, this, params)
                  : action.production[p]
              )
        );
      }
    }

    // Handle TR
    if (action.tr) {
      if (isFunction(action.tr)) {
        action.tr(player, this);
      } else {
        this.tr(player, action.tr);
      }
    }

    // Handle card resources
    if (action.cardResource) {
      if (isFunction(action.cardResource)) {
        action.cardResource(player, this, card);
      } else {
        this.cardResource(player, card, action.cardResource);
      }
    }

    // Handle drawing cards
    if (action.drawCard) {
      if (isFunction(action.drawCard)) {
        action.drawCard(player, this);
      } else if (!isNaN(action.drawCard)) {
        times(action.drawCard, () => this.drawCard(player));
      } else {
        const opts = {
          reveal: false,
          filter: () => true,
          num: action.drawCard.num || 1,
          log: `${action.drawCard.num} cards`,
          icon: {}
        };

        // Reveal cards with tags
        if (action.drawCard.tag) {
          opts.reveal = true;
          opts.filter = card => card.tags.includes(action.drawCard.tag);
          opts.log = `${action.drawCard.tag} cards`;
          opts.icon = { tag: action.drawCard.tag };
        }

        // Reveal cards with resources
        if (action.drawCard.resource) {
          opts.reveal = true;
          opts.filter = card => card.resource === action.drawCard.resource;
          opts.log = `${action.drawCard.resource} cards`;
          opts.icon = { resource: action.drawCard.resource };
        }

        // Reveal cards if needed, otherwise just draw the cards
        if (opts.reveal) {
          this.keepSelected(
            player,
            this.revealCards(player, opts.filter, opts.num, opts.log, opts.icon)
          );
        } else {
          times(opts.num, () => this.drawCard(player));
        }
      }
    }

    // Handle a choice
    if (action.or && action.or.length) {
      this.promptAction(player, card, false, 'Choose an action', action.or);
    }

    // Handle params
    if (action.param) {
      if (isFunction(action.param)) {
        action.param(player, this);
      } else {
        (Array.isArray(action.param) ? action.param : [action.param]).forEach(
          p => this.param(player, p)
        );
      }
    }

    // Handle tiles
    if (action.tile) {
      const tiles = (
        Array.isArray(action.tile) ? action.tile : [action.tile]
      ).map(tile => (isPlainObject(tile) ? tile : { tile }));

      tiles.forEach(tile =>
        this.promptTile(
          player,
          tile.special ? { special: tile.special } : tile.tile,
          tile.filter
        )
      );
    }

    // Handle custom card action
    if (action.action) {
      action.action(player, this, params);
    }
  }

  /**
   * Prompt for a card
   *
   * @param {object} player The player to prompt
   * @param {object} options Options for the card prompt
   * @param {string} options.deck Describes which deck to pull cards from (e.g. hand, automated, allCards, allActionableCards, etc.)
   * @param {(card: object) => boolean} options.filter Filter function for cards according to a specific criteria
   * @param {string} options.mode Specifies the mode of the card modal
   * @param {string} options.description Short description to the user
   */
  promptCard(player, options) {
    const cards =
      // Cards were provided
      options.cards?.length
        ? { 0: options.cards }
        : // If the deck is the hand, don't specify cards as the hand will be used
        options.deck === 'hand'
        ? undefined
        : // If the deck is the buy deck, draw the specified number of cards and show the draw drawer
        options.deck === 'buy'
        ? times(options.number ?? 1, this.drawCard(player, 'buy')) && undefined
        : // Otherwise group the cards by player (even if it's just for the current player)
          (options.anyone ? this.players : [player]).reduce(
            (o, p) => ({
              ...o,
              [p.number]:
                p.cards[options.deck] ||
                // Only select the cards that match a criteria
                p[options.deck || 'allActionableCards'].filter(
                  c =>
                    !options.filter ||
                    options.filter({ ...this.cardStore.get(c.card), ...c })
                )
            }),
            {}
          );

    console.log(cards);

    // Nothing matched the filter, typically due to a card being played with no cards matching that resource
    if (!Object.values(cards).flat().length) {
      return;
    }

    player.actionStack.push({
      type: 'prompt-card',
      description: options.description || 'Choose a card',
      mode: options.mode || 'select',
      ui: {
        drawer:
          options.deck === 'hand' || options.deck === 'buy'
            ? 'hand'
            : 'chooser',
        currentCard: { show: false },
        showMilestones: false,
        showStandardProjects: false
      },
      ...options,
      cards
    });
  }

  /**
   * Prompt for a tile placement
   *
   * @param {object} player Player placing the tile
   * @param {string} tile Tile type to place (ocean, city, greenery, or {special: 'type'})
   * @param {func} customFilter Optional filter for possible tile placement
   */
  promptTile(player, tile, customFilter) {
    // If all the oceans are placed, don't prompt
    if (tile === 'ocean' && this.params.ocean <= 0) {
      return;
    }

    // Find possible placements for tile
    const possibleTiles = this.findPossibleTiles(tile, player, customFilter);

    if (possibleTiles.length) {
      // Set the player status
      player.actionStack.push({
        tile: tile.special ? 'special' : tile,
        icon: tile.special,
        type: 'prompt-tile',
        ui: {
          drawer: null,
          playerStats: {
            show: false,
            pid: player.number
          },
          currentCard: { show: false },
          milestones: false,
          standardProjects: false
        },
        possibleTiles
      });
    }
  }

  /**
   * Helper function to show a choice prompt for a player
   *
   * @param {object} player The player to prompt
   * @param {object} card The associated card
   * @param {string} options.desc Description to present to user
   * @param {object} options.icon The icon to prompt for
   * @param {func} options.action Action when the player is chosen
   * @param {array} options.logSnippet The snippet of a log that would fit this sentence: '{player} {snippet} {targetPlayer}'
   * @param {func} options.optional Action when the player hits cancel
   * @param {func} options.filter Optional player filter
   */
  promptPlayer(player, card, options) {
    const renderIcon = (icons, p) =>
      (Array.isArray(icons) ? icons : [icons]).map(i =>
        isFunction(i) ? i(p, this) : i
      );

    this.promptAction(
      player,
      card,
      options.optional,
      options.title,
      this.players.map(p => ({
        icon: { player: p.number },
        rightIcon: renderIcon(options.icon, p),
        name: p.name,
        canPlay: options.filter ?? (() => true),
        log: options.logSnippet
          ? [...options.logSnippet, ' ', { player: p.number }]
          : null,
        targetPlayer: p.number,
        ...options.action
      }))
    );
  }

  /**
   * Prompt for a list of actions
   *
   * @param {object} player Player making the choice
   * @param {object} card The associated card
   * @param {boolean} optional Whether the choices is optional, i.e. can be "canceled"
   * @param {string} desc Description of the choices
   * @param {array} actions Overrides the list of actions on the  card
   */
  promptAction(player, card, optional = false, desc, actions) {
    player.ui.currentCard.show = false;
    console.log(actions);

    player.actionStack.push({
      type: 'prompt-action',
      desc,
      ui: {
        currentCard: {
          show: true,
          card: card.card ? card : { card: card.number },
          type: 'project',
          mode: 'action',
          actions: actions.map(action => ({
            ...action,
            canPlay: this.actionPlayable(action, player, this.cardStore)
          })),
          showResources: true,
          isPrompt: true,
          optional
        }
      }
    });
  }

  /**
   * Place a tile on the board
   *
   * @param {object} player Player placing the tile
   * @param {object} area Field area to place the tile
   * @param {string} tile Tile to place, e.g. 'ocean', 'city', etc.
   */
  placeTile(player, area, tile) {
    const type = isString(tile) ? tile : 'special';

    // Set the tile
    area.name = `${type.replace(/ /, '-')}-placed`;
    area.type = type;

    // If it's a special tile, set the icon
    if (tile.special) {
      area.icon = tile.special;
    }

    // Add a player marker
    if (type !== 'ocean') {
      area.player = player.number;
    }

    // Log the placement
    LogService.pushLog(
      this.id,
      new Log(player.number, [
        ` placed ${type === 'ocean' ? 'an' : !isString(tile) ? 'the' : 'a'} ${
          type === 'special' ? tile.special : type
        } `,
        { tile: type },
        ' tile.'
      ])
    );

    // Ocean adjacencies
    if (area.id) {
      player.resources.megacredit +=
        this.neighbors(area).filter(t => t.type === 'ocean').length *
        player.rates.ocean;
    }

    // Trigger events
    this.fire('onTile', player, area);
    this.fire('onAnyTile', null, area);

    // Capture the stack index before performing the action
    const stackIndex = player.actionStack.length - 1;

    // Handle placement bonuses
    (area.resources || [])
      .filter(r => r)
      .forEach(r => {
        // Draw a card
        if (r === 'card') {
          this.drawCard(player);
        }
        // Place an ocean
        else if (r === 'ocean') {
          this.promptTile(player, { tile: 'ocean' });
        }
        // Megacredits
        else if (r.megacredit) {
          player.resources.megacredit += r.megacredit;
        }
        // Anything else SHOULD be a resource
        else {
          player.resources[r]++;
        }
      });

    // Handle terraforming stuff
    if (tile === 'ocean') {
      this.param(player, 'ocean');
    } else if (tile === 'greenery') {
      this.param(player, 'oxygen');
    }

    // Mark the action as complete
    this.completeAction(player, stackIndex, area);

    // Check if this tile placement finished terraforming
    this.checkEndGame();
  }

  /**
   * Switch to prelude phase, i.e. reveal preludes
   */
  beginPreludePhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ prelude: 'PRELUDE PHASE', drawer: 'prelude' }], true, {
        classNames: ['phase', 'prelude-phase']
      })
    );
    LogService.pushLog(
      this.id,
      new Log(0, [
        'Reveal your ',
        { prelude: 'preludes', drawer: 'prelude' },
        '.'
      ])
    );

    this.phase = 'prelude';
    this.turn = this.startingPlayer;
    this.players.forEach(player => (player.ui.drawer = 'prelude'));
  }

  /**
   * Switch to the player order phase
   */
  beginPlayerOrderPhase() {
    // Set the new starting player
    this.startingPlayer++;
    if (this.startingPlayer > this.players.length) {
      this.startingPlayer = 1;
    }
    // Increase generation
    const gen = ++this.params.generation;
    // Set the turn to 1 until the action phase starts
    this.turn = 1;

    // Reset things for players
    this.players.forEach(p => {
      // Reset cards
      p.cards.active.forEach(c => (c.disabled = false));
      p.cards.corp.forEach(c => (c.disabled = false));
      // Reset if TR was set, for UNMI
      p.trRaised = false;
    });

    LogService.pushLog(
      this.id,
      new Log(
        0,
        [
          gen,
          {
            super:
              ['th', 'st', 'nd', 'rd'][
                gen < 10 ? gen : gen > 20 ? gen % 10 : 0
              ] || 'th'
          },
          ' generation'
        ],
        true,
        { classNames: ['phase'] }
      )
    );

    LogService.pushLog(
      this.id,
      new Log(this.startingPlayer, ' will be your starting player!')
    );

    this.beginResearchPhase();
  }

  /**
   * Switch to the research phase
   */
  beginResearchPhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ project: 'RESEARCH PHASE', drawer: 'hand' }], true, {
        classNames: ['phase', 'research-phase']
      })
    );

    // Draw 4 cards for each player and put in buy or draft
    for (let i = 0; i < 4; i++) {
      this.forEachPlayerOrder(p =>
        this.drawCard(p, this.variants.draft ? 'draft' : 'buy')
      );
    }

    this.phase = 'research';
    this.players.forEach(player => (player.ui.drawer = 'draft'));
  }

  /**
   * Switch to action phase
   */
  beginActionPhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ project: 'ACTION PHASE', drawer: 'hand' }], true, {
        classNames: ['phase', 'action-phase']
      })
    );

    this.playStartingAction();

    this.phase = 'action';
    this.turn = this.startingPlayer;
    this.players[this.turn - 1].firstAction = true;
    this.players.forEach(player => (player.ui.drawer = 'hand'));
  }

  /**
   * Switch to the production phase
   */
  beginProductionPhase() {
    LogService.pushLog(
      this.id,
      new Log(0, ['PRODUCTION PHASE'], true, {
        classNames: ['phase', 'production-phase']
      })
    );

    this.players.forEach(player => {
      // Reset players
      player.firstAction = true;
      player.passed = false;

      // Move existing power to heat
      player.resources.heat += player.resources.power;
      player.resources.power = 0;

      // Megacredits
      player.resources.megacredit += player.tr + player.production.megacredit;

      // Everything else
      player.resources.steel += player.production.steel;
      player.resources.titanium += player.production.titanium;
      player.resources.plant += player.production.plant;
      player.resources.power += player.production.power;
      player.resources.heat += player.production.heat;

      // TODO: Remove played status from Active cards
      player.cards.active.forEach(c => (c.disabled = false));
      player.cards.corp.forEach(c => (c.disabled = false));
    });

    // Check if the game should end (i.e. each global param is maxed out)
    if (this.checkEndGame()) {
      this.beginEndPhase();
    } else {
      // If WGT, switch to solar phase, otherwise go directly to player order phase
      this.variants.wgt ? this.beginSolarPhase() : this.beginPlayerOrderPhase();
    }
  }

  /**
   * Switch to the solar phase
   */
  beginSolarPhase() {
    // TODO: implement this

    this.beginPlayerOrderPhase();
  }

  /**
   * Switch to the end phase (i.e. placing plants)
   */
  beginEndPhase() {
    this.phase = 'end';

    LogService.pushLog(
      this.id,
      new Log(0, [
        'Convert any remaining plants ',
        { resource: 'plant' },
        ' to greeneries ',
        { tile: 'greenery' }
      ])
    );

    // Set up stuff for players
    this.players.forEach(player => {
      // Mark a player as passed if they don't have enough plants
      player.passed = player.resources.plant < player.rates.plant;

      player.ui = {
        drawer: null
      };
    });

    const game = this;

    // Nobody can place plants, skip right to score phase
    if (this.players.every(p => p.passed)) {
      this.beginScorePhase();
    } else {
      const done = () => {
        const player = game.players[game.turn - 1];

        this.resources(player, 'plant', -player.rates.plant);

        // If they're out of plants, move on to the next player
        if (player.resources.plant < player.rates.plant) {
          player.passed = true;
          game.nextTurn();

          // All players are done
          if (this.players.every(p => p.passed)) {
            game.beginScorePhase();
          } else {
            // Prompt for the next player
            game.promptTile(game.players[game.turn - 1], 'greenery', done);
          }
        }
        // Still got more plants, keep placing greeneries!
        else {
          game.promptTile(player, 'greenery', done);
        }
      };

      // Find the first player that can play plants and start placing greeneries!
      const player = this.findPlayerOrder(p => !p.passed);
      this.turn = player.number;
      this.promptTile(player, 'greenery', done);
    }
  }

  beginScorePhase() {
    this.turn = 0;
    this.phase = 'score';

    LogService.pushLog(
      this.id,
      new Log(0, 'GAME OVER', true, {
        classNames: ['phase', 'game-over']
      })
    );

    // Initialize scores
    this.players.forEach(p => {
      p.score = {
        tr: p.tr,
        awards: 0,
        milestones: 0,
        field: 0,
        cards: 0,
        total: 0
      };
      p.passed = false;
    });

    const awardList = { Tharsis, Elysium, Hellas }[this.board].awards;

    // Adding Venuphile to awards
    if (this.sets.includes('venus')) {
      awardList.push({
        name: 'Venuphile',
        value: player => player.tags.venus
      });
    }

    // Awards
    this.awards.forEach(a => {
      const award = awardList.find(aw => aw.name === a.name);
      const playerScores = groupBy(
        this.players.map(player => ({
          player,
          score: award.value(player, this)
        })),
        s => s.score
      );

      const keys = Object.keys(playerScores).sort((a, b) => +b - +a);

      // First place
      playerScores[keys[0]].forEach(score => (score.player.score.awards += 5));

      // Second place
      (playerScores[keys[1]] || []).forEach(
        score => (score.player.score.awards += 2)
      );
    });

    // Milestones
    this.milestones.forEach(
      m => (this.players[m.player - 1].score.milestones += 5)
    );

    // Don't include cities off mars, as they don't count towards points
    const field = this.getField().flat();

    this.players.forEach(player => {
      // Each greenery is 1 VP
      player.score.field += field.filter(
        t => t.player === player.number && t.type === 'greenery'
      ).length;

      // Every adjacenty between a city and a greenery is 1 VP
      player.score.field += field
        .filter(
          t =>
            t.player === player.number &&
            ['city', 'capital city'].includes(t.type)
        )
        .reduce(
          (sum, city) =>
            sum +
            this.neighbors(city).filter(t => t.type === 'greenery').length,
          0
        );

      // Cards
      player.score.cards = player.allPlayedCards
        .map(card => this.cardStore.get(card.card))
        .reduce(
          (sum, card) =>
            sum +
            (!card.vp ? 0 : isNaN(card.vp) ? card.vp(player, this) : card.vp),
          0
        );

      // Calculate total score
      player.tr = player.score.total = Object.values(player.score).reduce(
        (sum, val) => sum + val,
        0
      );
    });

    const finalScores = groupBy(this.players, p => p.score.total);
    const keys = Object.keys(finalScores).sort((a, b) => +b - +a);
    const winners = finalScores[keys[0]];

    if (winners.length === 1) {
      LogService.pushLog(
        this.id,
        new Log(0, [
          'Congrats to ',
          { player: winners[0].number },
          ' for winning the game!'
        ])
      );
    } else {
      const winner = winners.reduce((maxP, p) =>
        maxP.resources.megacredit < p.resources.megacredit ? p : maxP
      );

      LogService.pushLog(
        this.id,
        new Log(0, [
          'Congrats to ',
          { player: winner.number },
          ' for winning the tie breaker and winning the game!'
        ])
      );
    }
  }

  /**
   * Checks if we've reached the end of the game
   */
  checkEndGame() {
    if (this.endGame) {
      return true;
    }

    if (
      this.params.temperature >= paramStats.temperature.max &&
      this.params.oxygen >= paramStats.oxygen.max &&
      this.field.flat().filter(t => t.type === 'ocean').length <=
        paramStats.ocean.start
    ) {
      LogService.pushLog(
        this.id,
        new Log(0, 'Mars is TERRAFORMED!', true, {
          classNames: ['phase', 'end-phase']
        })
      );

      this.endGame = true;
    }

    return this.endGame;
  }

  /**
   * Advance to the next turn
   */
  nextTurn() {
    // Nothing can happen if there are any outstanding actions for any player
    if (this.players.some(p => p.actionStack.length)) {
      return;
    }

    // If all players have passed, move into the production phase
    if (this.players.every(p => p.passed)) {
      if (this.phase === 'action') {
        this.beginProductionPhase();
      }
      return;
    }

    const player = this.players[this.turn - 1];

    // First action, don't move to next turn
    if (this.phase === 'action' && player.firstAction) {
      player.firstAction = false;
      return;
    }

    // Go to the next player that hasn't passed
    do {
      this.turn++;
      if (this.turn > this.players.length) {
        this.turn = 1;
      }
    } while (this.players[this.turn - 1].passed);

    this.players[this.turn - 1].firstAction = true;

    // Play starting action, if applicable
    if (this.phase === 'action') {
      this.playStartingAction();
    }
  }

  /**
   * Fires an event
   *
   * @param {string} evt Event
   * @param {Player} player Player which fired the event
   */
  fire(evt, player, ...opts) {
    (player ? [player] : this.players).forEach(p =>
      // Loop through active cards and corp
      p.cards.active
        .map(c => this.cardStore.get(c.card))
        .filter(c => c.events && c.events[evt])
        .forEach(c => {
          c.events[evt](p, this, ...opts) &&
            // Only show the log if the event happened
            LogService.pushLog(
              this.id,
              new Log(p.number, [
                "'s ",
                c.type === 'corp' ? { corp: c.number } : { project: c.number },
                ' effect was triggered.'
              ])
            );
        })
    );
  }

  /**
   * Helper method to increase/decrease a resource
   *
   * @param {Player} player Player doing the action
   * @param {string} resource Resource to change
   * @param {number} num Amount to change
   */
  resources(player, resource, num) {
    player.resources[resource] = Math.max(player.resources[resource] + num, 0);

    // TODO fire resource change

    return true;
  }

  /**
   * Helper method to increase/decrease a resource production
   *
   * @param {Player} player Player doing the action
   * @param {string} resource Resource production to change
   * @param {number} num Amount to change
   */
  production(player, resource, num) {
    player.production[resource] += num;

    // TODO fire production change

    return true;
  }

  /**
   * Helper method to increase/decrease the player's terraform rating
   *
   * @param {Player} player Player doing the action
   * @param {number} num Amount to change
   */
  tr(player, num) {
    player.tr += num;

    // For UNMI, marks if TR was raised this generation
    // TODO: Move this to an event in UNMI
    player.trRaised = true;

    // TODO fire terraform change

    return true;
  }

  /**
   * Helper method to increase/decrease the card's resource
   *
   * @param {Player} player Player doing the action
   * @param {Card} card Card to change
   * @param {number} value Amount to change
   */
  cardResource(player, card, value = 0) {
    const playerCard = player.cards.hand
      .concat(player.cards.active)
      .concat(player.cards.corp)
      .find(c => c.card === card.number);

    if (playerCard) {
      const oldValue = playerCard.cardResource;

      playerCard.cardResource = Math.max(
        0,
        (playerCard.cardResource ?? 0) + value
      );

      this.fire('onCardResource', player, playerCard, oldValue);

      return playerCard.cardResource;
    }
  }

  /**
   * Helper method to get/set the card's related tile
   *
   * @param {Player} player Player doing the action
   * @param {Card} card Card to change
   * @param {obhect} tile Tile to set
   */
  cardTile(player, card, tile) {
    const playerCard = player.allCards.find(c => c.card === card.number);

    if (tile) {
      playerCard.tile = tile.id;
    }

    return tile || this.tileFromId(playerCard.tile);
  }

  completeAction(player, i, ...params) {
    // Nothing in the stack, complete the action as normal
    if (!player.actionStack.length || i < 0 || i >= player.actionStack.length) {
      // If params is a function, call that first
      if (params?.length === 1 && isFunction(params[0])) {
        params[0](player, this);
      }

      // Run end actions if stack is empty
      this.phase === 'prelude'
        ? this.endPreludeAction(player)
        : this.nextTurn();
    }
    // Work up the stack
    else {
      // If the index matches the current stack size, we're done! Start popping things off!
      if (player.actionStack.length - 1 === i) {
        // Pop off the action
        const action = player.actionStack.pop();

        // Capture the stack size
        const stackSize = player.actionStack.length;

        // Perform the action, if necessary
        if (action.action) {
          action.action(player, this, ...(params || action.params));
        }

        // If nothing new was added to the stack, keep going up the stack!
        // Otherwise, we're waiting for the player for the next action
        if (
          player.actionStack.length === stackSize &&
          (player.actionStack[i - 1]?.done || i - 1 < 0)
        ) {
          this.completeAction(player, i - 1);
        }
      }

      // Otherwise, put the params on the stack action to be used later
      else {
        // player.actionStack[i].params = params;
        player.actionStack[i].done = true;
      }
    }
  }

  endPreludeAction(player) {
    // If both preludes have been played, advance to the next player
    if (!player.cards.prelude.filter(prelude => !prelude.disabled).length) {
      this.nextTurn();

      // All preludes played, start action phase
      if (
        this.players.every(player =>
          player.cards.prelude.every(prelude => prelude.disabled)
        )
      ) {
        // Enable preludes
        this.players.forEach(player =>
          player.cards.prelude.forEach(prelude => (prelude.disabled = false))
        );

        this.beginActionPhase();
      }
    }
  }

  pushLog(player, log) {
    LogService.pushLog(this.id, new Log(player.number, log));
  }

  getField() {
    return this.field;
  }

  /**
   * Converts the game model to be sent to the client
   */
  export() {
    // eslint-disable-next-line no-unused-vars
    const { cards, cardStore, log, ...strippedGame } = this;
    return strippedGame;
  }
}

export default Game;
