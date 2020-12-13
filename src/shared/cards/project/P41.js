import React from 'react';
import Automated from '../Automated';
import {
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Draw 1 card.';

export default new Automated({
  number: 'P41',
  title: 'SF Memorial',
  cost: 7,
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor: 'A tribute to those who inspired us to come',
  action: () => {},
  vp: 1,
  emoji: '🗽',
  todo: true,
  layout: (
    <div className="flex">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Param name="card back" />
        </div>
      </div>
      <div className="col-2 description middle text-center">{desc}</div>
      <div className="col-1 bottom text-right">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
