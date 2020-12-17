import React from 'react';
import Event from '../Event';
import {
  Resource,
  Production,
  Param
} from '../../../client/game/components/assets/Assets';

const desc = 'Raise Venus 1 step. Increase your heat production 3 steps.';

export default new Event({
  number: 228,
  title: 'GHG Import From Venus',
  cost: 23,
  tags: ['venus', 'space', 'event'],
  set: 'venus',
  desc,
  flavor:
    'Less CO\u2082 on Venus and more on Mars helps terraform both planets',
  action: (player, game, done) => {
    game.production(player, 'heat', 3);
    game.param(player, 'venus', done);
  },
  emoji: '🍾',
  layout: (
    <div>
      <div className="flex text-center">
        <div className="col-1 middle text-center">
          <div className="resources">
            <Param name="venus" />
          </div>
        </div>
        <div className="col-2 middle text-center">
          <Production>
            <div className="flex">
              <Resource name="heat" />
              <Resource name="heat" />
              <Resource name="heat" />
            </div>
          </Production>
        </div>
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
