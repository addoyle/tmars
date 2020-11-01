import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  MegaCredit,
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step and increase your M€ production 3 steps. Place a city tile.';

export default new Automated({
  number: 182,
  title: 'Corporate Stronghold',
  cost: 11,
  tags: ['city', 'building'],
  set: 'corporate',
  desc,
  flavor: 'A city exclusively devoted to your corporation',
  action: () => {},
  vp: -2,
  emoji: '🏙',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="3" />
          </div>
        </Production>
      </div>
      <div className="col-2">
        <div className="resources">
          <Tile name="city" />
        </div>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
