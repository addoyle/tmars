import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 2 power tags. Decrease any energy production 1 step and increase your own 1 step.';

export default new Automated({
  number: '160',
  title: 'Power Supply Consortium',
  cost: 5,
  tags: ['power'],
  set: 'corporate',
  restriction: {
    value: 2,
    tag: 'power'
  },
  desc,
  flavor: 'Dominating the energy market allows you to make hostile takovers',
  production: (player, game, done) =>
    game.promptPlayer(
      player,
      'Pick a player to remove 1 energy production',
      [p => ({ production: 'power', value: p.production.power })],
      ['took 1 energy production ', { production: 'power' }, ' from'],
      targetPlayer => {
        game.production(player, 'power', 1);
        game.production(targetPlayer, 'power', -1);
        done();
      },
      player => player.production.power > 0
    ),
  canPlay: (player, game) => {
    const valid = !!game.players.filter(player => player.production.power > 0)
      .length;
    return {
      valid,
      msg: !valid ? 'Requires at least one player with energy production' : null
    };
  },
  emoji: '🔋',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
