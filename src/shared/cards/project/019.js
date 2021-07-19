import React from 'react';
import Event from '../Event';
import { Resource, Tile } from '../../../client/game/components/assets/Assets';

const desc =
  'Gain 3 plants, or add 3 microbes or 2 animals to ANOTHER card. Place an ocean tile.';

export default new Event({
  number: '019',
  title: 'Imported Hydrogen',
  cost: 16,
  tags: ['earth', 'space', 'event'],
  desc,
  flavor: 'A light-weight but expensive crucial element',
  tile: 'ocean',
  or: [
    {
      name: 'Plants',
      log: ['get 3 plants ', { resource: 'plant' }],
      icon: ['3', { resource: 'plant' }],
      resources: {
        plant: 3
      }
    },
    {
      name: 'Microbes on a card',
      icon: ['3', { resource: 'microbe' }],
      log: ['add 3 microbes ', { resource: 'microbe' }],
      resources: {
        microbe: 3
      }
    },
    {
      name: 'Animals on a card',
      icon: ['2', { resource: 'animal' }],
      log: ['add 2 animals ', { resource: 'animal' }],
      resources: {
        animal: 2
      }
    }
  ],
  emoji: '🎈',
  layout: (
    <div>
      <div className="resources text-center">
        <span>3</span>
        <Resource name="plant" />
        <span>OR 3</span>
        <Resource name="microbe" />*<span>OR 2</span>
        <Resource name="animal" />*
      </div>
      <div className="flex gutter">
        <div className="col-1 resources">
          <Tile name="ocean" />
        </div>
        <div className="col-5 description middle">{desc}</div>
      </div>
    </div>
  )
});
