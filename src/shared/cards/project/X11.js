import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Tag,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc =
  'Action: Spend 1 floater from here to gain 1 M€ for each floater here, INCLUDING THE PAID FLOATER (max 5).';
const desc = 'Add 1 floater for every Earth tag you have, including this.';

export default new Active({
  number: 'X11',
  title: 'Saturn Surfing',
  cost: 13,
  tags: ['jovian', 'earth'],
  set: 'promo',
  activeDesc,
  desc,
  flavor: 'Believe the hype and become a cloudrider in this new extreme sport!',
  action: player => (this.resource = player.tags.earth),
  vp: 1,
  emoji: '🏄',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="floater" />
        <span className="arrow" />
        <MegaCredit value="1" />
        <span>/</span>
        <Resource name="floater" />
        <span>*(max 5)</span>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <div className="resources">
          <Resource name="floater" />/<Tag name="earth" />
        </div>
      </div>
      <div className="col-1 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
