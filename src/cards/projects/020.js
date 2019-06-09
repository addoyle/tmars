import React from 'react';
import Active from '../../components/Active';
import MegaCredit from '../../components/assets/MegaCredit';
import Tile from '../../components/assets/Tile';

const top_desc = 'Effect: When you play a card, you pay 1 M€ less for it.';
const desc = 'Place a city tile NEXT TO NO OTHER TILE.';

export default new Active({
  number: 20,
  title: 'Research Outpost',
  cost: 18,
  tags: ['science', 'city', 'building'],
  desc,
  flavor: 'Using Titan\'s liquid methane as fuel will add carbon and heat to Mars',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏢',
  activeLayout: (
    <div>
      <div className="resources text-center">
        :<MegaCredit value="-1" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1 resources">
        <Tile name="city" asterisk />
      </div>
      <div className="col-3 description text-center middle">{desc}</div>
    </div>
  )
});
