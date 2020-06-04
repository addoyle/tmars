import React from 'react';
import Prelude from '../Prelude';
import {
  Tile,
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Place a city tile. Increase your M€ production 2 steps.';

export default new Prelude({
  number: 'P29',
  title: 'Self-Sufficient Settlement',
  tags: ['city', 'building'],
  set: 'prelude',
  desc,
  flavor: 'The investment was high, but it’s paying off now',
  emoji: '🌇',
  serverAction: player => {
    // TODO: place a city
    player.production.megacredit += 2;
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Tile name="city" />
        </div>
      </div>
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="description col-4 middle">{desc}</div>
    </div>
  )
});
