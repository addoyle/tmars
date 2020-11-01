import React from 'react';
import Event from '../Event';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Raise your terraform rating 2 steps.';

export default new Event({
  number: 112,
  title: 'Bribed Committee',
  cost: 7,
  tags: ['earth', 'event'],
  set: 'corporate',
  desc,
  flavor: 'Influencing the people in power',
  action: () => {},
  vp: -2,
  emoji: '👥',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <div className="resources middle">
          <Resource name="tr" />
          <Resource name="tr" />
        </div>
        <div className="description m-bottom">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
