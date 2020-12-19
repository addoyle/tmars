import React from 'react';
import Active from '../Active';
import {
  Production,
  Resource,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc =
  'Requires 9% oxygen. Decrease your plant production 1 step and increase your M€ production 2 steps. 1 VP for each animal on this card.';

export default new Active({
  number: '184',
  title: 'Livestock',
  cost: 13,
  tags: ['animal'],
  restriction: {
    value: 9,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  flavor: 'Providing meat, wood, leather, etc.',
  action: (player, game) => {
    game.production(player, 'plant', -1);
    game.production(player, 'megacredit', 2);
  },
  canPlay: player => {
    const valid = player.production.plant > 0;
    return {
      valid,
      msg: !valid ? 'Not enough plant production' : null
    };
  },
  vp: () => this.resources,
  emoji: '🐄',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="plant" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
