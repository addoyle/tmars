import React from 'react';
import Prelude from '../Prelude';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your titanium production 1 step. Gain 4 titanium.';

export default new Prelude({
  number: 'P25',
  title: 'Orbital Construction Yard',
  tags: ['space'],
  set: 'prelude',
  desc,
  flavor:
    'Materials arrive to Earth orbit from all around the solar system, to be assembled into interplanetary vessels',
  emoji: '🏗️',
  action: (player, game) => {
    game.resources(player, 'titanium', 4);
    game.production(player, 'production', 1);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <span>4</span>
          <Resource name="titanium" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
