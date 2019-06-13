import React from 'react';
import Event from '../../client/components/Event';
import { Resource, Param, Tag, Production } from '../../client/components/assets/Assets';

const desc = 'Raise terraform rating 2 steps and temperature 1 step. Increase your plant production 1 step or 4 steps if you have 3 plant tags.';

export default new Event({
  number: 37,
  title: 'Nitrogen-Rich Asteroid',
  cost: 31,
  tags: ['space', 'event'],
  desc,
  flavor: 'Adding nitrogen to Mars will both thicken the atmosphere with N2 and provide fertilizer for plants',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '☄',
  layout: (
    <div className="flex gutter">
      <div className="col-4">
        <Production>
          <div className="flex">
            <div className="center">
              <Resource name="plant" />
              <span>OR</span>
            </div>
          </div>
          <div className="flex">
            <div>
              <span>3</span>
              <Tag name="plant" />
              <span>: 4</span>
              <Resource name="plant" />
            </div>
          </div>
        </Production>
      </div>
      <div className="col-5">
        <div className="resources">
          <Resource name="tr" />
          <Resource name="tr" />
          <Param name="temperature" />
        </div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
