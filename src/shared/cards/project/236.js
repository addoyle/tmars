import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Tag,
  MegaCredit,
  Production,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 1 step for each Earth tag you have, including this. Place a city tile ON THE RESERVED AREA.';

export default new Automated({
  number: 236,
  title: 'Luna Metropolis',
  cost: 21,
  tags: ['space', 'earth', 'city'],
  set: 'venus',
  desc,
  flavor: 'The largest city on the Moon',
  action: () => {},
  vp: 2,
  emoji: '🌃',
  todo: true,
  layout: (
    <div className="flex gutter">
      <div>
        <div className="flex gutter">
          <div className="m-bottom">
            <Production>
              <div className="flex">
                <MegaCredit value="1" />
                <span>/</span>
                <Tag name="earth" />
              </div>
            </Production>
          </div>
          <div className="resources">
            <Tile name="city" asterisk />
          </div>
        </div>
        <div className="description middle text-center">{desc}</div>
      </div>
      <div className="text-right bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
