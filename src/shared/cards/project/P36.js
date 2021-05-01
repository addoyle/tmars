import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  VictoryPoint,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your steel production 1 step.';

export default new Automated({
  number: 'P36',
  title: 'House Printing',
  cost: 10,
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor: 'Large scale 3D printing - on Mars',
  production: {
    steel: 1
  },
  vp: 1,
  emoji: '🖨',
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-2 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
