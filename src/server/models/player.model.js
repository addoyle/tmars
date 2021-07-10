/**
 * Represents a single player
 */
export default class Player {
  name;
  number;
  tr = 20;
  resources = {
    megacredit: 0,
    steel: 0,
    titanium: 0,
    plant: 0,
    power: 0,
    heat: 0
  };
  production = {
    megacredit: 0,
    steel: 0,
    titanium: 0,
    plant: 0,
    power: 0,
    heat: 0
  };
  tags = {
    building: 0,
    space: 0,
    power: 0,
    science: 0,
    jovian: 0,
    earth: 0,
    plant: 0,
    microbe: 0,
    animal: 0,
    city: 0,
    venus: 0,
    event: 0
  };
  tiles = {
    city: 0,
    greenery: 0,
    special: 0
  };
  cards = {
    hand: [],
    draft: [],
    active: [],
    buy: [],
    automated: [],
    event: [],
    corp: [],
    prelude: [],
    onDeck: []
  };
  ui = {
    drawer: 'corp',
    milestones: false,
    standardProjects: false
  };
  rates = {
    steel: 2, // Value of steel for playing building cards
    titanium: 3, // Value of titanium for playing space cards
    heatAsMC: 0, // Value of heat as M€ (for Helion)
    buy: 3, // Cost to buy a card
    plant: 8, // Plants to place a greenery
    heat: 8, // Heat to raise temperature
    ocean: 2, // Ocean adjacency bonus,
    requirement: {}, // Requirement modifier (for temp/oxygen)
    cost: {} // Cost modifier functions
  };
  passed = false;
  firstAction = true;
  startingAction = true;
  score = {};
  actionStack = [];

  constructor(player) {
    player && Object.assign(this, player);
  }

  get allCards() {
    return this.cards.hand
      .concat(this.cards.active)
      .concat(this.cards.automated)
      .concat(this.cards.event)
      .concat(this.cards.corp)
      .concat(this.cards.prelude);
  }

  get allActionableCards() {
    return this.cards.active.concat(this.cards.corp);
  }

  get allFaceupCards() {
    return this.cards.active
      .concat(this.cards.automated)
      .concat(this.cards.corp)
      .concat(this.cards.prelude);
  }

  get allPlayedCards() {
    return this.allFaceupCards.concat(this.cards.event);
  }
}
