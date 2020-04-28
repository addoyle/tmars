import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Tag,
  VictoryPoint
} from '../../client/game/components/assets/Assets';

const desc =
  'Raise your TR 1 step for each Jovian tag you have, including this.';

export default new Automated({
  number: 197,
  title: 'Terraforming Ganymede',
  cost: 33,
  tags: ['jovian', 'space'],
  set: 'corporate',
  desc,
  flavor: 'Why stop at Mars?',
  clientAction: () => {},
  serverAction: () => {},
  vp: 2,
  emoji: '🌘',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <div className="resources">
          <Resource name="tr" />/<Tag name="jovian" />
        </div>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
