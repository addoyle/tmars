import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 3 ocean tiles and that you lose 2 plants. Increase your plant production 2 steps.';

export default new Automated({
  number: 146,
  title: 'Nitrophilic Moss',
  cost: 8,
  tags: ['plant'],
  restriction: {
    value: 3,
    tile: 'ocean'
  },
  desc,
  flavor: 'Specially made to thrive on the salty Martian rock',
  action: (player, game) => {
    game.resources(player, 'plant', -2);
    game.production(player, 'plant', 2);
  },
  canPlay: player => {
    const valid = player.resources.plant > 1;
    return {
      valid,
      msg: !valid ? 'Requires at least two plant resources' : null
    };
  },
  emoji: '🥦',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div className="resources middle">
          <span>&ndash;</span>
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
        <Production>
          <div className="flex">
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="description m-top">{desc}</div>
    </div>
  )
});
