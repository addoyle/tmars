import React from 'react';
import Event from '../Event';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Remove up to 2 animals or 5 plants from any player.';

export default new Event({
  number: '050',
  title: 'Virus',
  cost: 1,
  tags: ['microbe', 'event'],
  set: 'corporate',
  desc,
  flavor:
    'The virus is transient, changing from liquid to air-borne to blood transfusion',
  or: [
    {
      name: 'Remove 2 Animals',
      log: ['removed 2 animals ', { resource: 'animal' }],
      icon: ['-2', { resource: 'animal', anyone: true }],
      resources: {
        anyone: {
          animal: -2
        }
      }
    },
    {
      name: 'Remove 5 Plants',
      log: ['removed 5 plants ', { resource: 'plant' }],
      icon: ['-5', { resource: 'plant', anyone: true }],
      resources: {
        anyone: {
          plant: -5
        }
      }
    }
  ],
  emoji: '🦠',
  layout: (
    <div>
      <div className="resources text-center">
        <span>-2</span>
        <Resource name="animal" anyone />
        <span> OR -5</span>
        <Resource name="plant" anyone />
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
