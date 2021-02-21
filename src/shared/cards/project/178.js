import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease any heat production 2 steps and increase your energy production 1 step.';

export default new Automated({
  number: '178',
  title: 'Heat Trappers',
  cost: 6,
  tags: ['power', 'building'],
  desc,
  flavor: 'Utilizing temperature gradients for energy production',
  action: (player, game, done) =>
    game.promptPlayer(
      player,
      'Pick a player to remove 2 heat production',
      [p => ({ production: 'heat', value: p.production.heat })],
      ['took 2 heat production ', { production: 'heat' }, ' from'],
      targetPlayer => {
        game.production(player, 'power', 1);
        game.production(targetPlayer, 'heat', -2);
        done();
      },
      player => player.production.heat >= 2
    ),
  canPlay: (player, game) => {
    const valid = !!game.players.filter(player => player.production.heat >= 2)
      .length;
    return {
      valid,
      msg: !valid ? 'Requires at least one player with 2 heat production' : null
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
            <Resource name="heat" anyone />
            <Resource name="heat" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
            <Resource name="blank" />
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
