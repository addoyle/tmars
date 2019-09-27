import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, MegaCredit, Resource, Tile } from '../../client/components/assets/Assets';

const desc = 'Decrease your energy production 1 step and increase your M€ production 2 steps. Place a city tile ADJACENT TO AT LEAST 2 OTHER CITY TILES.';

export default new Automated({
  number: 120,
  title: 'Urbanized Area',
  cost: 10,
  tags: ['city', 'building'],
  desc,
  flavor: 'When the population begins to soar, cities will eventually merge into large urban areas',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🌃',
  layout: (
    <div className="flex gutter center">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="middle">
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="description text-center col-3">{desc}</div>
    </div>
  )
});
