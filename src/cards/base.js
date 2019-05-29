const cards = {
  1: {
    number: 1,
    type: 'automated',
    title: 'Colonizer Training Camp',
    cost: 8,
    tags: ['jovian', 'building'],
    restriction: {
      max: true,
      value: 5,
      param: 'oxygen'
    },
    vp: 2,
    desc: 'Oxygen must be 5% or less.',
    flavor: 'Preparing for settlement of the moons of Jupiter',
    emoji: '🏕'
  },
  2: {
    number: 2,
    type: 'automated',
    title: 'Asteroid Mining Consortium',
    cost: 13,
    tags: ['jovian'],
    restriction: {
      value: 1,
      production: 'titanium'
    },
    vp: 1,
    desc: 'Requires that you have titanium production. Decrease any titanium production 1 step and increase your own 1 step.',
    flavor: 'Your hold on the titanium market tightens',
    clientAction: game => {
      // TODO: pseudo code
      game.activePlayer.production('titanium', 1);
      game.pickPlayer().then(player => player.production('titanium', -1));
    },
    serverAction: game => {
      // TODO: pseudo code
      game.activePlayer.production('titanium', 1);
      game.targetPlayer.production('titanium', -1);
    },
    emoji: '🍪'
  },
  3: {
    number: 3,
    type: 'automated',
    title: 'Deep Well Heating',
    cost: 13,
    tags: ['power', 'building'],
    desc: 'Increase your energy production 1 step. Increase temperature 1 step.',
    flavor: 'Digging deep to find heat from the core',
    clientAction: game => {
      // TODO: pseudo code
      game.activePlayer.production('power', 1);
      game.temperature(1, game.activePlayer)
    },
    serverAction: game => {
      // TODO: pseudo code
      game.activePlayer.production('power', 1);
      game.temperature(1, game.activePlayer)
    },
    emoji: '♨'
  },
  4: {
    number: 4,
    type: 'automated',
    title: 'Cloud Seeding',
    cost: 11,
    tags: [],
    restriction: {
      value: 3,
      tile: 'ocean'
    },
    desc: 'Requires 3 ocean tiles. Decrease your M€ production 1 step and any heat production 1 step. Increase your plant production 2 steps.',
    flavor: 'Lessens solar influx, but enhances plant growth',
    clientAction: game => {
      game.activePlayer.production('plant', 2);
      game.activePlayer.production('mc', -1);
      game.pickPlayer().then(player => player.production('heat', -1));
    },
    serverAction: game => {
      game.activePlayer.production('plant', 2);
      game.activePlayer.production('mc', -1);
      game.targetPlayer.production('heat', -1);
    },
    emoji: '⛅'
  },
  5: {
    number: 5,
    type: 'active',
    title: 'Search For Life',
    cost: 3,
    tags: ['science'],
    restriction: {
      max: true,
      value: 6,
      param: 'oxygen'
    },
    desc: 'Oxygen must be 6% or less. 3 VPs if you have one or more science resources here.',
    top_desc: 'Action: Spend 1 M€ to reveal and discard the top card of the draw deck. If that card has a microbe tag, add a science resource here.',
    flavor: 'Finding native life-forms would be the greatest discovery in history, so let\'s find out!',
    clientEffect: game => {
      game.drawCard()
        .then(card => game.reveal(card)
          .then(card => {
            if (card.tags.indexOf('microbe') >= 0) {
              this.resources = (this.resources || 0) + 1;
            }
          })
            .then(card => game.discard(card)));
    },
    serverEffect: game => {

    },
    vp: game => {
      return this.resources * 3;
    },
    emoji: '🔍'
  },
  6: {
    number: 6,
    type: 'active',
    title: 'Inventor\'s Guild',
    cost: 9,
    tags: ['science'],
    top_desc: 'ACTION: LOOK AT THE TOP CARD AND EITHER BUY IT OR DISCARD IT.',
    flavor: 'When great minds meet, new ideas abound',
    clientEffect: game => {},
    serverEffect: game => {},
    emoji: '🤔'
  },
  7: {
    number: 7,
    type: 'active',
    title: 'Martian Rails',
    cost: 13,
    tags: ['building'],
    top_desc: 'Action: Spend 1 energy to gain 1 M€ for each city tile ON MARS',
    flavor: 'Fast and cheap transportation for goods and guys',
    clientEffect: game => {},
    serverEffect: game => {},
    emoji: '🚝'
  }
};

export default cards;
