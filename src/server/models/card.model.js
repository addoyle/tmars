import fs from 'fs';

export default class CardModel {
  project = {};
  corp = {};
  prelude = {};

  constructor() {
    const CARD_DIR = `${__dirname}/../../shared/cards`;

    Promise.all([
      // Load projects
      ...fs
        .readdirSync(`${CARD_DIR}/project`)
        .map(f => import(`${CARD_DIR}/project/${f}`)),

      // Load corps
      ...fs
        .readdirSync(`${CARD_DIR}/corp`)
        .map(f => import(`${CARD_DIR}/corp/${f}`)),

      // Load preludes
      ...fs
        .readdirSync(`${CARD_DIR}/prelude`)
        .map(f => import(`${CARD_DIR}/prelude/${f}`))
    ]).then(res => {
      ({ project: this.project, corp: this.corp, prelude: this.prelude } = res
        .map(card => card.default)
        .reduce(
          (cards, card) => {
            cards[
              ['automated', 'active', 'event'].includes(card.type)
                ? 'project'
                : card.type
            ][card.number] = card;

            return cards;
          },
          { project: {}, corp: {}, prelude: {} }
        ));

      // Cards should never be changed, only copied
      Object.freeze(this.project);
      Object.freeze(this.corp);
      Object.freeze(this.prelude);

      console.log(Object.values(this.project).length, 'projects loaded');
      console.log(Object.values(this.corp).length, 'corporations loaded');
      console.log(Object.values(this.prelude).length, 'preludes loaded');
    });
  }

  get(id) {
    return this.project[id] || this.corp[id] || this.prelude[id];
  }
}
