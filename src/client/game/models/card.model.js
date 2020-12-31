import { API } from '../../util/api';
import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import { isString } from 'lodash';

class Card {
  @observable cards = {};

  constructor() {
    const loadCards = (type, cards) => {
      Promise.all(
        cards.map(card => import(`../../../shared/cards/${type}/${card}`))
      ).then(res => this.setCardsFromPromise(type, res));
    };

    API('game/card-numbers').then(res => {
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
    const cardObj = isString(card) ? { card } : card;

    return this.cards[type] && this.cards[type][this.normalize(cardObj.card)];
  }
}

export default Card;
