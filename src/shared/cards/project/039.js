import React from 'react';
import Event from '../Event';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 3 steps and gain 4 steel. Remove up to 8 plants from any player.';

export default new Event({
  number: 39,
  title: 'Deimos Down',
  cost: 31,
  tags: ['space', 'event'],
  desc,
  flavor: 'We don’t use that moon anyway',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '☄',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources">
          <Param name="temperature" />
          <Param name="temperature" />
          <Param name="temperature" />
        </div>
      </div>
      <div className="col-1 middle">
        <div className="table">
          <div className="row">
            <div className="cell resources text-right">
              <span>4</span>
            </div>
            <div className="cell resources">
              <Resource name="steel" />
            </div>
          </div>
          <div className="row">
            <div className="cell resources text-right">
              <span>-8</span>
            </div>
            <div className="cell resources">
              <Resource name="plant" anyone />
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 middle">
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
