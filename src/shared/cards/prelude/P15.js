import React from 'react';
import Prelude from '../Prelude';
import {
  Param,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc = 'Raise temperature 3 steps. Remove 5 M€.';

export default new Prelude({
  number: 'P15',
  title: 'Huge Asteroid',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'Deep impact on Mars - before too many move there',
  emoji: '☄',
  action: (player, game) => {
    game.resources(player, 'megacredit', -5);
    game.param('temperature', player);
    game.param('temperature', player);
    game.param('temperature', player);
  },
  layout: (
    <div className="flex m-top m-bottom">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Param name="temperature" />
          <Param name="temperature" />
          <Param name="temperature" />
        </div>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <MegaCredit value="-5" />
        </div>
      </div>
      <div className="col-3 middle description">{desc}</div>
    </div>
  )
});
