import React from 'react';
import Automated from '../Automated';
import {
  Param,
  VictoryPoint,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 3 science tags. Either raise the temperature 2 steps, or raise Venus 2 steps. Add 2 floaters to ANY card.';

export default new Automated({
  number: 217,
  title: 'Atmoscoop',
  cost: 22,
  tags: ['jovian', 'space'],
  set: 'venus',
  restriction: {
    value: 3,
    tag: 'science'
  },
  desc,
  flavor:
    "Scooping up hydrogen from Jupiter's upper atmosphere while aerobraking",
  clientAction: () => {},
  serverAction: () => {},
  vp: 1,
  emoji: '🥄',
  layout: (
    <div>
      <div className="resources">
        <Param name="temperature" />
        <Param name="temperature" />
        <span> OR </span>
        <Param name="venus" />
        <Param name="venus" />
      </div>
      <div className="flex gutter">
        <div className="col-4 middle">
          <div className="resources">
            <Resource name="floater" />
            <Resource name="floater" />*
          </div>
          <div className="description text-center">{desc}</div>
        </div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});