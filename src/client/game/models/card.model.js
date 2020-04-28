import { API } from '../../util/api';
import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

class Card {
  @observable cards = {};

  constructor() {
    const loadCards = (type, cards) => {
      Promise.all(
        cards.map(card => import(`../../../cards/${type}/${card}`))
      ).then(res => this.setCardsFromPromise(type, res));
    };

    API('card-numbers').then(res => {
      loadCards('corp', res.corporation);
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
    return this.cards[type] && this.cards[type][this.normalize(card)];
  }
}

export default Card;
