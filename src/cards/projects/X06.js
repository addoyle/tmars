import React from 'react';
import Event from '../Event';
import { MegaCredit, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Steal 3 M€ from a player that REMOVED YOUR RESOURCES OR DECREASED YOUR PRODUCTION this generation. Place this card face down in THAT PLAYER\'S EVENT PILE.';

export default new Event({
  number: 'X06',
  title: 'Law Suit',
  cost: 2,
  tags: ['earth', 'event'],
  set: 'promo',
  desc,
  flavor: 'See you in court',
  clientAction: game => {},
  serverAction: game => {},
  vp: -1,
  emoji: '👨‍⚖️',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <div className="resources">
          <span>STEAL&nbsp;</span>
          <MegaCredit value="3" anyone />
          <span>*</span>
        </div>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 flex bottom">
        <VictoryPoint anyone>
          <span className="big point">-1</span>
        </VictoryPoint><span>*</span>
      </div>
    </div>
  )
});
