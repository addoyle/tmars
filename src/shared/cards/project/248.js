import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint,
  MegaCredit,
  Tile,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 2 floaters to ANY VENUS CARD.';
const desc =
  'Requires 2 science tags. Increase your M€ production 2 steps. Place a city tile on THE RESERVED AREA. 1 VP per 3 floaters on this card.';

export default new Active({
  number: 248,
  title: 'Stratopolis',
  cost: 22,
  tags: ['venus', 'city'],
  set: 'venus',
  restriction: {
    value: 2,
    tag: 'science'
  },
  activeDesc,
  desc,
  flavor: 'A center of commerce in the cool clouds',
  action: () => {},
  emoji: '🌥',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="floater" tag="venus" />
        <Resource name="floater" tag="venus" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <MegaCredit value="2" />
        </Production>
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/3
            <Resource name="floater" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
