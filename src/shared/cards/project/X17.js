import React from 'react';
import Event from '../Event';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'REQUIRES THAT A PLAYER REMOVED ANOTHER PLAYER’S PLANTS THIS GENERATION. Gain 1 titanium or 2 steel.';

// TODO implement this when TURMOIL gets added

export default new Event({
  number: 'X17',
  title: 'Crash Site Cleanup',
  cost: 4,
  tags: ['event'],
  set: 'promo',
  restriction: {
    value: 1,
    resource: 'plant',
    anyone: true,
    text: '–'
  },
  desc,
  flavor: 'Turning the new crater into a national park',
  action: () => {},
  emoji: '🧹',
  vp: 1,
  todo: true,
  layout: (
    <div>
      <div className="resources">
        <Resource name="titanium" />
        <span>&nbsp;OR&nbsp;</span>
        <Resource name="steel" />
        <Resource name="steel" />
      </div>
      <div className="flex m-top">
        <div className="col-4 middle text-center description">{desc}</div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
