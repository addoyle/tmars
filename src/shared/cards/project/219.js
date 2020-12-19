import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 2 steps. Add 1 resource to ANY VENUS CARD.';

export default new Automated({
  number: '219',
  title: 'Corroder Suits',
  cost: 8,
  tags: ['venus'],
  set: 'venus',
  desc,
  flavor: 'Allowing access to the harsh Venusian environment',
  action: (player, game) => {
    game.production(player, 'megacredit', 2);
    // TODO figure out how to add resource to a venus card
  },
  emoji: '👨‍🚀',
  todo: true,
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle text-center">
        <div className="resources">
          <Resource name="any" tag="venus" />
        </div>
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
