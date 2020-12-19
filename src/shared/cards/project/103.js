import React from 'react';
import Active from '../Active';
import { Param, Resource } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 4 energy to gain 2 steel and increase oxygen 1 step.';

export default new Active({
  number: '103',
  title: 'Steelworks',
  cost: 15,
  tags: ['building'],
  activeDesc,
  flavor:
    'Turning the soil into steel and oxygen sounds good. It just takes a lot of energy',
  actions: [
    {
      name: 'Spend 4 Energy',
      icon: (
        <>
          <span>4</span>
          <Resource name="power" />
        </>
      ),
      canPlay: player => {
        const valid = player.resources.power >= 4;
        return {
          valid,
          msg: 'Not enough energy'
        };
      },
      action: (player, game, done) => {
        game.resources(player, 'power', -4);
        game.resources(player, 'steel', 2);
        game.param(player, 'oxygen', done);
      }
    }
  ],
  emoji: '🛠',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>4</span>
        <Resource name="power" />
        <span className="arrow" />
        <Resource name="steel" />
        <Resource name="steel" />
        <Param name="oxygen" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
