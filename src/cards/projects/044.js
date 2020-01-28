import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { VictoryPoint, Production, MegaCredit, Tile } from '../../client/components/assets/Assets';

const desc = 'Oxygen must be 4% or less. Place this tile NEXT TO NO OTHER TILE. Increase your M€ production 1 step.';

export default new Automated({
  number: 44,
  title: 'Natural Preserve',
  cost: 9,
  tags: ['science', 'building'],
  restriction: {
    max: true,
    value: 4,
    param: 'oxygen'
  },
  desc,
  flavor: 'Creating a national park with original Martian landforms and environments',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🏜',
  layout: (
    <div className="flex">
      <div className="col-4 middle">
        <div className="flex center gutter">
          <div className="resources">
            <Tile name="special" icon="mars" asterisk />
          </div>
          <div className="middle">
            <Production>
              <div className="flex"><MegaCredit value="1" /></div>
            </Production>
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
