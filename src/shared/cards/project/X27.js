import React from 'react';
import Active from '../Active';
import {
  Resource,
  Tile,
  Param
} from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc = 'Action: Add a microbe or animal to ANOTHER card.';
const desc = 'Place an ocean tile. Raise temperature 1 step. Gain 3 plants.';

const card = new Active({
  number: 'X27',
  title: 'Mohole Lake',
  cost: 31,
  tags: ['building'],
  set: 'promo',
  activeDesc,
  desc,
  flavor:
    'Excavating a Mohole and then flooding it is an excellent way to create a zone of ambient temperature, moisture, and liquid water',
  resources: {
    plant: 3
  },
  param: ['temperature'],
  tile: 'ocean',
  actions: [
    {
      name: 'Add a microbe',
      icon: <Resource name="microbe" />,
      resources: {
        microbe: 1
      }
    },
    {
      name: 'Add an animal',
      icon: <Resource name="animal" />,
      resources: {
        animal: 1
      }
    }
  ],
  emoji: '🌊',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="microbe" />*<span> OR </span>
        <Resource name="animal" />*
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-3 middle text-center">
        <div className="resources">
          <Resource name="plant" />
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
        <div className="resources">
          <Param name="temperature" />
          <Tile name="ocean" />
        </div>
      </div>
      <div className="col-4 description middle text-center">{desc}</div>
    </div>
  )
});

export default card;
