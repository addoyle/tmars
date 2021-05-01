import React from 'react';
import Event from '../Event';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 3 steps and gain 4 steel. Remove up to 8 plants from any player.';

export default new Event({
  number: '039',
  title: 'Deimos Down',
  cost: 31,
  tags: ['space', 'event'],
  desc,
  flavor: 'We don’t use that moon anyway',
  action: (player, game, done) =>
    game.param(player, 'temperature', () =>
      game.param(player, 'temperature', () =>
        game.param(player, 'temperature', () =>
          game.promptPlayer(
            player,
            'Pick a player to remove up to 8 plants',
            [p => ({ text: +p.resources.plant }), { resource: 'plant' }],
            ['took 8 plants ', { resource: 'plant' }, ' from'],
            targetPlayer => {
              targetPlayer && game.resources(targetPlayer, 'plant', -8);
              done();
            },
            player => player.resources.plant > 0,
            done
          )
        )
      )
    ),
  resources: {
    steel: 4
  },
  emoji: '☄',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources">
          <Param name="temperature" />
          <Param name="temperature" />
          <Param name="temperature" />
        </div>
      </div>
      <div className="col-1 middle">
        <div className="table">
          <div className="row">
            <div className="cell resources text-right">
              <span>4</span>
            </div>
            <div className="cell resources">
              <Resource name="steel" />
            </div>
          </div>
          <div className="row">
            <div className="cell resources text-right">
              <span>-8</span>
            </div>
            <div className="cell resources">
              <Resource name="plant" anyone />
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 middle">
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
