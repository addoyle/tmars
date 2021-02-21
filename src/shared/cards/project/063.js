import React from 'react';
import Event from '../Event';
import { Param, Resource } from '../../../client/game/components/assets/Assets';

const desc =
  'Raise oxygen 1 step. Remove 2 plants from any player. Gain 2 steel.';

export default new Event({
  number: '063',
  title: 'Mining Expedition',
  cost: 12,
  tags: ['event'],
  desc,
  flavor: 'Ruthlessly excavating rich areas',
  action: (player, game, done) => {
    game.resources(player, 'steel', 2);
    game.param(player, 'oxygen', () =>
      game.promptPlayer(
        player,
        'Pick a player to remove up to 2 plants',
        [p => ({ text: +p.resources.plant }), { resource: 'plant' }],
        ['took 2 plants ', { resource: 'plant' }, ' from'],
        targetPlayer => {
          targetPlayer && game.resources(targetPlayer, 'plant', -2);
          done();
        },
        player => player.resources.plant > 0,
        done
      )
    );
  },
  emoji: '🏗',
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <div className="flex">
          <div className="resources middle">
            <Param name="oxygen" />
          </div>
          <div>
            <div className="resources flex">
              <div className="col-1">&ndash;</div>
              <Resource name="plant" anyone />
              <Resource name="plant" anyone />
            </div>
            <div className="resources flex">
              <div className="col-1">+</div>
              <Resource name="steel" />
              <Resource name="steel" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 middle description">{desc}</div>
    </div>
  )
});
