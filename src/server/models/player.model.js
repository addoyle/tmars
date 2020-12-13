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
  phase = '';
  ui = {};
  rates = {
    steel: 2, // Value of steel for playing building cards
    titanium: 3, // Value of titanium for playing space cards
    buy: 3, // Cost to buy a card
    plant: 8, // Plants to place a greenery
    heat: 8, // Heat to raise temperature
    ocean: 2 // Ocean adjacency bonus
  };
  firstAction;
  passed;
  modifiers = {};

  constructor(name) {
    this.name = name;
  }
}
