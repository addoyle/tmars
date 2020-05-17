/**
 * Represents a single player
 */
export default class Player {
  name;
  corp;
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
    automated: [],
    event: [],
    prelude: []
  };

  constructor(name) {
    this.name = name;
  }

  set corporation(corp) {
    this.corp = corp;

    if (corp && corp.starting) {
      Object.assign(this.resources, corp.starting.resources || {});
      Object.assign(this.production, corp.starting.production || {});
      (corp.tags || []).forEach(tag => this.tags[tag]++);
    }
  }
}
