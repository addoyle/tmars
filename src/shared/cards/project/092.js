import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  MegaCredit,
  VictoryPoint,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your titanium production 2 steps and your M€ production 2 steps. 1 VP per Jovian tag you have.';

export default new Automated({
  number: '092',
  title: 'Io Mining Industries',
  cost: 11,
  tags: ['jovian', 'space'],
  set: 'corporate',
  desc,
  flavor: 'Supplying fuel and valuable minerals',
  action: (player, game) => {
    game.production(player, 'titanium', 2);
    game.production(player, 'megacredit', 2);
  },
  vp: player => player.tags.jovian,
  emoji: '⛏',
  layout: (
    <div className="flex gutter">
      <div className="col-3">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
            <Resource name="titanium" />
            <MegaCredit value="2" />
          </div>
        </Production>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Tag name="jovian" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
