import React from 'react';
import Prelude from '../Prelude';
import { Tile, Resource, Production } from '../../client/components/assets/Assets';

const desc = 'Place a city tile. Increase your plant production 1 step.';

export default new Prelude({
  number: 'P09',
  title: 'Early Settlement',
  tags: ['city', 'building'],
  set: 'prelude',
  desc,
  flavor: 'The first Martians wrote their story of civilization shortly after the terraforming announcement',
  emoji: '⛺',
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-right middle">
        <div className="resources">
          <Tile name="city" />
        </div>
      </div>
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="description col-4 middle">{desc}</div>
    </div>
  )
});
