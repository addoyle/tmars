import React from 'react';
import Automated from '../Automated';
import {
  Param,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires Venus 16%. Raise Venus 1 step. Add 1 microbe or 1 animal to ANOTHER VENUS CARD.';

export default new Automated({
  number: '261',
  title: 'Venusian Plants',
  cost: 13,
  tags: ['venus', 'plant'],
  set: 'venus',
  restriction: {
    value: 16,
    param: 'venus'
  },
  desc,
  flavor: 'Starting the biosphere in earnest',
  action: (player, game, done) =>
    // TODO figure out or and resources
    done(),
  venus: ['venus'],
  vp: 1,
  emoji: '🌵',
  todo: true,
  layout: (
    <div className="text-center">
      <div className="resources text-center">
        <Param name="venus" />
        <Resource name="blank" />
        <Resource name="microbe" tag="venus" />
        <span> OR </span>
        <Resource name="animal" tag="venus" />
      </div>
      <div className="flex gutter">
        <div className="description middle col-4">{desc}</div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
