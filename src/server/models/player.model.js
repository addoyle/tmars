/**
 * Represents a single player
 */
export default class Player {
  name;
  corp;
  tr = 20;
  resources = {
    mc: 0,
    st: 0,
    ti: 0,
    pl: 0,
    po: 0,
    he: 0
  };
  production = {
    mc: 0,
    st: 0,
    ti: 0,
    pl: 0,
    po: 0,
    he: 0
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
    active: [],
    automated: [],
    event: [],
    prelude: []
  };

  constructor(name) {
    this.name = name;
  }

  set corporation(corp) {
    this.corp = corp;
    const corpCard = require(`../../cards/corps/${corp}`).default;

    Object.assign(this.resources, corpCard.starting.resources || {});
    Object.assign(this.production, corpCard.starting.production || {})
  }
}
