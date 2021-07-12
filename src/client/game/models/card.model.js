import { API } from '../../util/api';
import { makeAutoObservable } from 'mobx';
// import { computedFn } from 'mobx-utils';
import { isString } from 'lodash';

class Card {
  cards = {};

  constructor() {
    makeAutoObservable(this, {
      // get: computedFn
    });

    const loadCards = (type, cards) => {
      Promise.all(
        cards.map(card => import(`../../../shared/cards/${type}/${card}`))
      ).then(res => this.setCardsFromPromise(res));
    };

    API('game/card-numbers').then(res => {
      loadCards('corp', res.corp);
      loadCards('project', res.project);
      loadCards('prelude', res.prelude);
    });
  }

  setCardsFromPromise(cards) {
    this.cards = {
      ...this.cards,
      ...cards
        .map(card => card.default)
        .reduce((set, card) => (set = { ...set, [card.number]: card }), {})
    };
  }

  get(card) {
    if (!card) {
      return null;
    }

    return this.cards[isString(card) ? card : card.card];
  }
}

export default Card;
