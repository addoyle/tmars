import React from 'react';
import Active from '../Active';
import {
  Param,
  MegaCredit,
  Tile
} from '../../client/game/components/assets/Assets';

const activeDesc = 'Action: Spend 2 M€ to draw a card.';
const desc = 'Place this tile.';

export default new Active({
  number: 199,
  title: 'Restricted Area',
  cost: 11,
  tags: ['science'],
  set: 'corporate',
  activeDesc,
  desc,
  flavor:
    'A place to conduct secret research, preventing the wrong people from getting in. Or out',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🚫',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <MegaCredit value="2" />
        <span className="arrow" />
        <Param name="card back" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex center">
      <div className="resources">
        <Tile name="special" icon="restricted" />
      </div>
      <div className="description text-center middle">{desc}</div>
    </div>
  )
});
