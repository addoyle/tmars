import React from 'react';
import Automated from '../Automated';
import {
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 3 science tags. Draw 2 cards.';

export default new Automated({
  number: 216,
  title: 'Atalanta Planitia Lab',
  cost: 10,
  tags: ['venus', 'science'],
  set: 'venus',
  restriction: {
    value: 3,
    tag: 'science'
  },
  desc,
  flavor: 'Examining the extreme environment at the lowest elevation on Venus',
  action: (player, game) => {
    game.drawCard(player);
    game.drawCard(player);
  },
  vp: 2,
  emoji: '❄️',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle text-center">
        <div className="resources">
          <Param name="card back" />
          <Param name="card back" />
        </div>
      </div>
      <div className="col-3 description middle">{desc}</div>
      <div className="col-2 bottom text-right">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
