import { API } from '../../util/api';
import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

class Card {
  @observable cards = {};

  constructor() {
    const loadCards = (type, cards) => {
      Promise.all(
        cards.map(card => require(`../../../cards/${type}/${card}`))
      ).then(res => this.setCardsFromPromise(type, res));
    };

    API('card-numbers').then(res => {
      loadCards('corp', res.corp);
      loadCards('project', res.project);
      loadCards('prelude', res.prelude);
    });
  }

  @action
  setCardsFromPromise(type, cards) {
    this.cards = {
      ...this.cards,
      [type]: cards
        .map(card => card.default)
        .reduce(
          (set, card) =>
            (set = { ...set, [this.normalize(card.number)]: card }),
          {}
        )
    };
  }

  normalize(card) {
    return isNaN(card) ? card : card.toString().padStart(3, '0');
  }

  @computedFn
  get(type, card) {
    if (this.cards[type]) {
      return this.cards[type][this.normalize(card)];
    }

    return undefined;
  }
}

export default Card;
