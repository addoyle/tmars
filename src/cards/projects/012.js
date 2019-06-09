import React from 'react';
import Active from '../../components/Active';
import Resource from '../../components/assets/Resource';
import MegaCredit from '../../components/assets/MegaCredit';
import Tile from '../../components/assets/Tile';
import Tag from '../../components/assets/Tag';
import VictoryPoint from '../../components/assets/VictoryPoint';

const top_desc = 'Action: Pay 12 M€ to place an ocean tile. TITANIUM MAY BE USED as if playing a space card.';
const desc = '1 VP for each Jovian tag you have.';

export default new Active({
  number: 12,
  title: 'Water Import From Europa',
  cost: 25,
  tags: ['jovian', 'space'],
  top_desc,
  desc,
  flavor: 'With its low gravity, this Jovian ice moon is suitable for mass export of water.',
  clientAction: game => {},
  serverAction: game => {},
  clientActiveAction: game => {},
  serverActiveAction: game => {},
  vp: game => {},
  emoji: '💧',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Resource name="power" />
          <span className="arrow" />
          <MegaCredit value="1" />/
          <Tile name="city" anyone asterisk />
        </div>
        <div className="description text-center">{top_desc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description middle">{desc}</div>
      <div className="col-1 middle">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Tag name="jovian" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
