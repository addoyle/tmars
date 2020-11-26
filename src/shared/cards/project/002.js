import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires that you have titanium production. Decrease any titanium production 1 step and increase your own 1 step.';

export default new Automated({
  number: 2,
  title: 'Asteroid Mining Consortium',
  cost: 13,
  tags: ['jovian'],
  set: 'corporate',
  restriction: {
    value: 1,
    production: 'titanium'
  },
  vp: 1,
  desc,
  flavor: 'Your hold on the titanium market tightens',
  action: (player, game, done) => {
    game.production(player, 'titanium', 1);
    game.promptPlayer(
      targetPlayer => game.production(targetPlayer, 'titanium', -1),
      done
    );
  },
  emoji: '🌘',
  layout: (
    <div className="flex gutter">
      <div className="col-2">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="titanium" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-3 description">{desc}</div>
      <div className="col-2 bottom">
        <VictoryPoint>
          <span className="point big">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
