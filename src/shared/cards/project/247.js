import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Param
} from '../../../client/game/components/assets/Assets';

const desc =
  'Discard 1 card from hand and THEN draw 3 cards. All OPPONENTS draw 1 card.';

export default new Automated({
  number: 247,
  title: 'Sponsored Academies',
  cost: 9,
  tags: ['science', 'earth'],
  set: 'venus',
  desc,
  flavor:
    'Allowing universities independence, but with an ‘incentive’ to help you',
  action: () => {},
  vp: 1,
  emoji: '🏫',
  layout: (
    <div className="m-top">
      <div className="resources text-center">
        &ndash;
        <Param name="card back" />
        &nbsp;+
        <Param name="card back" />
        <Param name="card back" />
        <Param name="card back" />* +
        <Param name="card back" anyone />*
      </div>
      <div className="flex gutter m-top">
        <div className="description text-center">{desc}</div>
        <div className="text-right bottom">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
