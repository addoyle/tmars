import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Raise your TR 1 step.';

export default new Automated({
  number: 'X23',
  title: 'Jovian Embassy',
  cost: 14,
  tags: ['jovian', 'building'],
  set: 'promo',
  desc,
  flavor:
    'A place to negotiate trade deals and regulations with the other solar system',
  tr: 1,
  vp: 1,
  emoji: '🏢',
  layout: (
    <div className="flex">
      <div className="col-3 middle text-center">
        <div className="resources">
          <Resource name="tr" />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-4 flex bottom right">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
