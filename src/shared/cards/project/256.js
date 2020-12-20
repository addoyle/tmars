import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production,
  Param
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Decrease your energy production 1 step to raise Venus 1 step.';
const desc = 'Requires Venus 10%.';

export default new Active({
  number: '256',
  title: 'Venus Magnetizer',
  cost: 7,
  tags: ['venus'],
  set: 'venus',
  restriction: {
    value: 10,
    param: 'venus'
  },
  activeDesc,
  desc,
  flavor:
    'After reducing the most corrosive elements from the atmosphere, cables can be deployed around the equator, the current creating a magnetic field',
  actions: [
    {
      name: 'Raise Venus',
      log: ['raise Venus ', { param: 'venus' }],
      icon: <Param name="venus" />,
      canPlay: player => {
        const valid = player.production.power >= 1;
        return {
          valid,
          msg: !valid ? 'Not enough energy production' : null
        };
      },
      action: (player, game, done) => {
        game.production(player, 'power', -1);
        game.param(player, 'venus', done);
      }
    }
  ],
  emoji: '🧲',
  activeLayout: (
    <div>
      <div className="flex center">
        <Production>
          <Resource name="power" />
        </Production>
        <div className="resources middle">
          <span className="arrow" />
          <Param name="venus" />
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});
