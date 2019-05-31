import React from 'react';
import Active from '../../../components/Active';
import Resource from '../../../components/assets/Resource';
import MegaCredit from '../../../components/assets/MegaCredit';
import Tag from '../../../components/assets/Tag';
import VictoryPoint from '../../../components/assets/VictoryPoint';

const desc = 'Oxygen must be 6% or less. 3 VPs if you have one or more science resources here.';
const top_desc = 'Action: Spend 1 M€ to reveal and discard the top card of the draw deck. If that card has a microbe tag, add a science resource here.';

export default new Active({
  number: 5,
  title: 'Search For Life',
  cost: 3,
  tags: ['science'],
  restriction: {
    max: true,
    value: 6,
    param: 'oxygen'
  },
  desc,
  top_desc,
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
  emoji: '🔍',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <MegaCredit value="1" /> <span className="arrow" /> <Tag name="microbe" />*: <Resource name="science" />
        </div>
        <div className="description text-center">{top_desc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description text-center middle">{desc}</div>
      <div className="col-1 middle">
        <VictoryPoint>
          <span>
            <Resource name="science" />*: <span className="point">3</span>
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
