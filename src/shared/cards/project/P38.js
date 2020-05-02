import React from 'react';
import Event from '../Event';
import {
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Oxygen must be 4% or lower. Draw 2 cards.';

export default new Event({
  number: 'P38',
  title: 'Martian Survey',
  cost: 9,
  tags: ['science', 'event'],
  set: 'prelude',
  restriction: {
    value: 4,
    param: 'oxygen',
    max: true
  },
  desc,
  flavor: 'A thorough investigation of the geology of Mars',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🔦',
  vp: 1,
  layout: (
    <div className="flex gutter">
      <div className="col-2 text-center middle">
        <div className="resources">
          <Param name="card back" />
          <Param name="card back" />
        </div>
      </div>
      <div className="col-3 description middle">{desc}</div>
      <div className="col-2 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
