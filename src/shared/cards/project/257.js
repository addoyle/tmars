import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Param,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise Venus 1 step. Increase your plant production 1 step. Add 2 microbes to ANOTHER card.';

export default new Automated({
  number: '257',
  title: 'Venus Soils',
  cost: 20,
  tags: ['venus', 'plant'],
  set: 'venus',
  desc,
  flavor: 'Its unique components can be used on Mars as well',
  action: (player, game, done) => {
    game.param(player, 'venus', done);
    // TODO figure out microbes
  },
  production: {
    plant: 1
  },
  emoji: '🌱',
  todo: true,
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div className="resources middle">
          <Param name="venus" />
        </div>
        <Production>
          <Resource name="plant" />
        </Production>
        <div className="resources middle">
          <Resource name="microbe" />
          <Resource name="microbe" />*
        </div>
      </div>
      <div className="description m-top">{desc}</div>
    </div>
  )
});
