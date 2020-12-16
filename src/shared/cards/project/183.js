import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 6% oxygen. Decrease any plant production 1 step and increase your energy production 2 steps.';

export default new Automated({
  number: 183,
  title: 'Biomass Combustors',
  cost: 4,
  tags: ['power', 'building'],
  restriction: {
    value: 6,
    param: 'oxygen'
  },
  desc,
  flavor: 'Burning wood is easy',
  action: (player, game, done) => {
    game.promptPlayer(
      player,
      { production: 'plant' },
      ['took 1 plant ', { resource: 'plant' }, ' production from'],
      targetPlayer => {
        game.production(targetPlayer, 'plant', -2);
        game.production(player, 'power', 2);
        done();
      }
    );
  },
  canPlay: (player, game) => {
    const valid = !!game.players.filter(player => player.production.plant > 0)
      .length;
    return {
      valid,
      msg: !valid ? 'Requires at least one player with plant production' : null
    };
  },
  vp: -1,
  emoji: '🔥',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="plant" anyone />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
