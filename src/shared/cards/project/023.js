import React from 'react';
import Active from '../Active';
import { Resource, Tile } from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: When anyone places an ocean tile, gain 2 plants.';
const desc = 'It must be -12°C or colder to play. Gain 1 plant.';

export default new Active({
  number: 23,
  title: 'Arctic Algae',
  cost: 12,
  tags: ['plant'],
  restriction: {
    max: true,
    value: -12,
    param: 'temperature'
  },
  desc,
  activeDesc,
  flavor: 'Suitable for freezing temperatures',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🥗',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tile name="ocean" anyone />:
        <Resource name="plant" />
        <Resource name="plant" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1 resources">
        <Resource name="plant" />
      </div>
      <div className="col-5 description text-center middle">{desc}</div>
    </div>
  )
});
