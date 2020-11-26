import fs from 'fs';
import { normalize } from '../util';

export default class CardModel {
  project = {};
  corporation = {};
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
      ({
        project: this.project,
        corporation: this.corporation,
        prelude: this.prelude
      } = res
        .map(card => card.default)
        .reduce(
          (cards, card) => {
            cards[
              Object.getPrototypeOf(Object.getPrototypeOf(card)).constructor
                .name === 'Project'
                ? 'project'
                : card.constructor.name.toLowerCase()
            ][normalize(card.number)] = card;

            return cards;
          },
          { project: {}, corporation: {}, prelude: {} }
        ));

      // Cards should never be changed, only copied
      Object.freeze(this.project);
      Object.freeze(this.corp);
      Object.freeze(this.prelude);

      console.log(Object.values(this.project).length, 'projects loaded');
      console.log(
        Object.values(this.corporation).length,
        'corporations loaded'
      );
      console.log(Object.values(this.prelude).length, 'preludes loaded');
    });
  }
}
